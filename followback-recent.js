require('dotenv').config();
const axios = require('axios');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const RECENT_FOLLOWERS_LIMIT = 10; // Adjust to set the number of recent followers to process

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': GITHUB_USERNAME,
  },
});

(async () => {
  try {
    // Fetch recent followers (limited to the specified number)
    const followersResponse = await api.get(`/users/${GITHUB_USERNAME}/followers?per_page=${RECENT_FOLLOWERS_LIMIT}`);
    const recentFollowers = followersResponse.data.map((user) => user.login);

    // Fetch all accounts you already follow
    const followingResponse = await api.get(`/users/${GITHUB_USERNAME}/following?per_page=100`);
    const followingLogins = followingResponse.data.map((user) => user.login);

    // Identify recent followers you don't follow back
    const notFollowingBack = recentFollowers.filter((user) => !followingLogins.includes(user));

    console.log(`Users to follow back: ${notFollowingBack.join(', ')}`);

    // Follow back users
    for (const user of notFollowingBack) {
      console.log(`Following ${user}...`);
      await api.put(`/user/following/${user}`);
      console.log(`Followed ${user}`);
    }

    console.log('Followed back recent users!');
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
})();
