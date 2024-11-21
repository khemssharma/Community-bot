require('dotenv').config();
const axios = require('axios');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const EXCLUDED_USERS = ['prabhatojha', 'KumarGourav07']; // Add usernames you don't want to unfollow here

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': GITHUB_USERNAME,
  },
});

(async () => {
  try {
    // Fetch your followers
    const followersResponse = await api.get(`/users/${GITHUB_USERNAME}/followers`);
    const followers = followersResponse.data.map((user) => user.login);

    // Fetch accounts you follow
    const followingResponse = await api.get(`/users/${GITHUB_USERNAME}/following`);
    const following = followingResponse.data.map((user) => user.login);

    // Identify non-reciprocal accounts
    const nonFollowers = following.filter((user) => !followers.includes(user));

    // Exclude specific usernames
    const filteredNonFollowers = nonFollowers.filter((user) => !EXCLUDED_USERS.includes(user));

    console.log(`Accounts not following you back: ${filteredNonFollowers.join(', ')}`);

    // Unfollow non-reciprocal accounts
    for (const user of filteredNonFollowers) {
      console.log(`Unfollowing ${user}...`);
      await api.delete(`/user/following/${user}`);
      console.log(`Unfollowed ${user}`);
    }

    console.log('Unfollowed all non-reciprocal accounts, excluding specified users!');
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
})();
