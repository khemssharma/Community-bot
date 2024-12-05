const puppeteer = require('puppeteer');
const your_username = process.env.your_username;
const your_password = process.env.your_password;
const target_user = process.env.target_user;

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to randomly decide if a user should be followed
function shouldFollow() {
  return Math.random() > 0.2;  // 80% chance to follow, 20% chance to skip
}

// Function to simulate random scrolling behavior
async function randomScroll(page) {
  const dialog = await page.$('div[role="dialog"] .isgrP');
  const scrollHeight = await dialog.evaluate(el => el.scrollHeight);
  const randomScrollDistance = Math.floor(Math.random() * (scrollHeight / 2));
  const scrollTop = await dialog.evaluate(el => el.scrollTop);

  await page.evaluate((dialog, scrollTop, randomScrollDistance) => {
    dialog.scrollTop = scrollTop + randomScrollDistance;
  }, dialog, scrollTop, randomScrollDistance);

  await page.waitForTimeout(randomDelay(2000, 5000)); // Simulate human pause after scrolling
}

// Function to interact with profiles
async function viewProfile(page) {
  const profileLink = await page.$('a');
  if (profileLink) {
    await profileLink.click(); // Click on a random profile
    await page.waitForTimeout(randomDelay(3000, 6000)); // Simulate time spent viewing the profile
    await page.goBack(); // Go back to the previous page
  }
}

async function followUsers() {
  const browser = await puppeteer.launch({
    headless: true, // Ensure the browser is launched in headless mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu', // Disable GPU to improve performance in CI environments
      '--window-size=1280x1024', // Set a window size for the headless browser
      '--remote-debugging-port=9222' // Optional: useful for debugging if needed
    ]
  });

  const page = await browser.newPage();

  // Go to Instagram login page
  await page.goto('https://www.instagram.com/accounts/login/');

  // Wait for the username field to be available
  await page.waitForSelector('input[name="username"]', { visible: true });

  // Log in with your credentials
  await page.type('input[name="username"]', your_username);
  await page.type('input[name="password"]', your_password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // Navigate to the following page of a specific user
  await page.goto(`https://www.instagram.com/${target_user}/following/`);

  // Wait for the modal to open
  await page.waitForSelector('div[role="dialog"]');

  let previousHeight = 0;
  let currentHeight = 0;

  // Loop through the infinite scroll
  while (true) {
    // Follow users currently visible and view some profiles
    const followButtons = await page.$$eval('button', (buttons) =>
      buttons.filter((btn) => btn.innerText === 'Follow')
    );

    for (const button of followButtons) {
      try {
        // Randomly decide whether to follow the user
        if (shouldFollow()) {
          await button.click();
          console.log('Followed a user');
          await page.waitForTimeout(randomDelay(1000, 5000)); // Random delay between follows
        } else {
          console.log('Skipped a user');
        }

        // Occasionally view a profile before following
        if (Math.random() > 0.7) {  // 30% chance to view a profile
          await viewProfile(page);
        }
      } catch (error) {
        console.log('Error following user:', error);
      }
    }

    previousHeight = currentHeight;

    // Randomly scroll
    await randomScroll(page);

    // Get the new scroll height
    currentHeight = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"] .isgrP');
      return dialog.scrollHeight;
    });

    // Check if scrolling has reached the bottom
    if (currentHeight === previousHeight) {
      console.log('Reached the bottom of the list.');
      break;
    }

    // Occasionally take a break during the session
    if (Math.random() > 0.8) {  // 20% chance to take a break after each scroll
      console.log('Taking a break...');
      await page.waitForTimeout(randomDelay(5000, 15000)); // Simulate break (5-15 seconds)
    }
  }

  console.log('Finished following users.');
  await browser.close();
}

followUsers();
