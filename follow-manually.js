// This script is meant to be run manually time to time
require('dotenv').config();
const axios = require('axios');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const TARGET_USERNAME = 'shahradelahi'; // Replace with the username whose following list you want to follow

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': GITHUB_USERNAME,
  },
});

(async () => {
  try {
    let page = 1;
    let following = [];
    let fetchMore = true;

    // Fetch the list of users the target account is following (handle pagination)
    while (fetchMore) {
      const response = await api.get(`/users/${TARGET_USERNAME}/following`, {
        params: { per_page: 100, page },
      });
      following = following.concat(response.data.map((user) => user.login));
      if (response.data.length < 100) fetchMore = false;
      page++;
    }

    console.log(`${TARGET_USERNAME} is following ${following.length} users:`, following);

    // Follow each user
    for (const user of following) {
      console.log(`Following ${user}...`);
      await api.put(`/user/following/${user}`);
      console.log(`Followed ${user}`);
    }

    console.log('Followed all users the target account is following!');
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
})();
