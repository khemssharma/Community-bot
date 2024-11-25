require('dotenv').config();
const axios = require('axios');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'User-Agent': GITHUB_USERNAME,
  },
});

// Function to fetch paginated data
const fetchPaginatedData = async (url) => {
  let results = [];
  let page = 1;

  while (true) {
    const response = await api.get(`${url}?per_page=100&page=${page}`);
    results = results.concat(response.data);
    if (response.data.length < 100) break; // No more pages
    page++;
  }

  return results;
};

(async () => {
  try {
    // Fetch all followers with pagination
    const followers = await fetchPaginatedData(`/users/${GITHUB_USERNAME}/followers`);
    const followerLogins = followers.map((user) => user.login);

    // Fetch all accounts you already follow
    const following = await fetchPaginatedData(`/users/${GITHUB_USERNAME}/following`);
    const followingLogins = following.map((user) => user.login);

    // Identify users you don't follow back
    const notFollowingBack = followerLogins.filter((user) => !followingLogins.includes(user));

    console.log(`Users to follow back: ${notFollowingBack.join(', ')}`);

    // Follow back users
    for (const user of notFollowingBack) {
      console.log(`Following ${user}...`);
      await api.put(`/user/following/${user}`);
      console.log(`Followed ${user}`);
    }

    console.log('Followed back all users!');
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
})();
