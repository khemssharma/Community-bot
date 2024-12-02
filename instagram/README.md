# **Instagram Automation with Puppeteer: A Fun Guide**

Hey there, awesome devs! 👋

This example shows how you can automate the process of following users on Instagram. It's a fun way to learn how to use Puppeteer and play with browser automation.

But just to make things clear right off the bat: while this is a neat demo, I **personally** don't endorse automating browser actions like this for real use. Instagram has a system in place to prevent automated behavior, and overuse of scripts like this can lead to some *not-so-fun* consequences (like getting your account flagged). So use responsibly! 🚫

---

### **Why Puppeteer?**
Puppeteer is awesome because it allows you to control a browser, interact with websites, and simulate actions that would normally require human interaction. It’s like having a little robot do your bidding! 🤖✨

This script demonstrates the basics of logging into Instagram, navigating a user's "following" list, and randomly following users—just like a human might do. It's a great way to practice working with headless browsers.

---

### **What You’ll Need**

1. **Node.js**: If you haven’t already, [install Node.js](https://nodejs.org/). This is necessary to run the Puppeteer script.
2. **Puppeteer**: Puppeteer is the magic behind the scenes, controlling the browser. It’s easy to install with NPM.

---

### **Steps to Run the Script**

1. **Clone the Repo** (or create your own folder):
   ```
    git clone https://github.com/khemssharma/Community-bot.git1
    cd Community-bot
    cd instagram
   ```

2. **Install Dependencies**: Run the following command to install Puppeteer:
    ```
    npm install puppeteer
    ```

3. **Create a .env file like following**: 
    ```
    your_username = 
    your_password = 
    target_user = 
    ```
4. **Run the Script**: In your terminal, run:
    ```
    node index.js
    ```

This will launch the script, open a browser window, and start automating the following process. Don’t forget to have fun while watching your little bot in action! 🎉
