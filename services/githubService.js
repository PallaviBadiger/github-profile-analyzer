const axios = require("axios");

exports.fetchGitHubProfile = async (username) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error(`GitHub user '${username}' not found`);
    }
    throw new Error("Failed to fetch GitHub profile");
  }
};