# Community Bot

## Overview
Welcome! This repository is a collection of Automatation Scripts. More run-on-cloud Automation Scripts are coming soon 😊

## Key Features

### Automatic Follow Back: 
You can follow-back all the users automatically just by running the script followback-all.js 😊
### Automatic Unfollow: 
You can unfollow all the users automatically who don't follow you back just by running the script unfollow.js 😁 <br>
If they unfollow you; you be like: It's sad to see you go 🥹 I won't Spam you either.
### Automatically Follow All the users from the Following List of another user :
Some of the users in a following list of other users might be real gems 💎🤗

### Scheduled Runs: 
If you're so concerned about others unfollowing you; You can set a sheduled run like this: <br> 
Actions > Automate Unfollow Non-Reciprocal Accounts > Run workflow 
The job is currently set to occur every <strong>8 Hours</strong> but you can change it in unfollow.yml.

### GitHub’s Rate Limits: 
 GitHub API has a limit of 5000 API Calls per Hour. <br> 
 After this limit, a Call will simply return an error. <br>
 Changes will be postponed for some time after crossing a Secondary Limit.

## How to Use ##

### Clone the repository:
```
git clone https://github.com/khemssharma/Community-bot.git 
cd community-bot
```

### Create a .env file with your GitHub username and token:
```
GITHUB_USERNAME=your_github_username     
GITHUB_TOKEN=your_github_token
```

### Install the necessary packages (axios and dotenv):
```
npm install axios dotenv
```

### Run the bot to follow/unfollow users:
```
node followback-all.js
node unfollow.js
node followbyUser.js
```

### Running Automatically (via GitHub Actions)
Set up your GitHub Secrets for USERNAME and TOKEN.  <br>   
The bot will run automatically at scheduled times in .github/workflows/unfollow.yml

## License
This repository is licensed under the MIT License. See LICENSE for more details.
