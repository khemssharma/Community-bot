from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from dotenv import load_dotenv
import time
import os

# Load environment variables from .env file
load_dotenv()

# Fetch credentials from .env
GITHUB_USERNAME = os.getenv("GITHUB_USERNAME")
GITHUB_PASSWORD = os.getenv("GITHUB_PASSWORD")
TARGET_USER = os.getenv("TARGET_USER")

def login_github(driver):
    """Logs in to GitHub."""
    print("Navigating to GitHub login page...")
    driver.get("https://github.com/login")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "login_field")))
    print("Logging in...")
    driver.find_element(By.ID, "login_field").send_keys(GITHUB_USERNAME)
    driver.find_element(By.ID, "password").send_keys(GITHUB_PASSWORD)
    driver.find_element(By.NAME, "commit").click()
    print("Logged in to GitHub.")

def get_following_users(driver):
    """Scrapes the list of users the target user follows."""
    print(f"Navigating to {TARGET_USER}'s following list...")
    driver.get(f"https://github.com/{TARGET_USER}?tab=following")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "d-table")))

    following_users = []

    while True:
        try:
            print("Fetching user list...")
            # Re-fetch the list of users on the current page to avoid stale references
            users = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "d-table"))
            )

            for user in users:
                try:
                    username = user.find_element(By.CSS_SELECTOR, "a[data-hovercard-type='user']").text
                    if username not in following_users:
                        following_users.append(username)
                except Exception as e:
                    print(f"Skipping a user due to: {str(e)}")

            # Check if a "Next" button exists for pagination
            try:
                next_button = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.LINK_TEXT, "Next"))
                )
                next_button.click()
                time.sleep(2)  # Allow time for the page to load
            except:
                print("No more pages to scrape.")
                break

        except Exception as e:
            print(f"Error while fetching users: {str(e)}")
            break

    print(f"Found {len(following_users)} users that {TARGET_USER} is following.")
    return following_users

def follow_user(driver, username):
    """Follows a single user."""
    print(f"Attempting to follow {username}...")
    driver.get(f"https://github.com/{username}")

    try:
        # Wait for the "Follow" button to be visible
        follow_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@value='Follow']"))
        )

        # Click the "Follow" button
        follow_button.click()
        print(f"Successfully followed {username}!")

    except Exception as e:
        # Handle cases where the button isn't found or already followed
        print(f"Could not follow {username}. Reason: {str(e)}")

def main():
    # Set up Selenium WebDriver (e.g., for Chrome)
    print("Setting up WebDriver...")
    driver = webdriver.Chrome()

    try:
        # Log in to GitHub
        login_github(driver)

        # Get the list of users the target user is following
        following_users = get_following_users(driver)
        print(f"Users to follow: {following_users}")

        # Follow each user
        for username in following_users:
            follow_user(driver, username)
            time.sleep(1)  # Avoid overwhelming the server

    finally:
        driver.quit()
        print("Script completed and browser closed.")

if __name__ == "__main__":
    main()