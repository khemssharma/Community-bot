# Community Bot
## Overview
Welcome! This repository is a collection of automatation scripts. More run-on-cloud automation scripts are coming soon! 😊

## Key Features
### Automatic Follow Back: 
You can follow-back all the users automatically just by running the script followback.js! 😊
### Automatic Unfollow: 
Unfollow.js unfollows all the users automatically who don't follow you back. 😁
### Scheduled Runs: 
<strong>At scheduled runs</strong>, all the followers will get follow-back and non-reciprocal accounts will be unfollowed.

### GitHub’s Rate Limits: 
 Please note that GitHub has limit of 5000 API Calls per Hour. <br>
 Also you can not follow 150+ accounts in succession via API (unless you pay). <br> 
 After this limit, a Call will simply return an error.

## How to Use ##

### Clone the repository:
```
git clone https://github.com/yourusername/community-bot.git 
cd community-bot
```

### Set Up the Bot: Create a .env file with your GitHub username and token:
```
GITHUB_USERNAME=your_github_username     
GITHUB_TOKEN=your_github_token
```

### Install Dependencies: Install the necessary packages (axios and dotenv):
```
npm install axios dotenv
```

### Run the Bot: Run the bot to follow or unfollow users:
```
node followback.js
node unfollow.js
```

### Running Automatically (via GitHub Actions)
Set up your GitHub Secrets for USERNAME and TOKEN.  <br>   
The bot will run automatically at scheduled times in .github/workflows/follow-back.yml and other.


## License
This repository is licensed under the MIT License. See LICENSE for more details.
