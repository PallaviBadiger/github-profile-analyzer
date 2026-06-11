const githubService = require("../services/githubService");
const profileModel = require("../models/profileModel");

exports.analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const data = await githubService.fetchGitHubProfile(username);
    await profileModel.upsertProfile(data);

    res.json({
      success: true,
      message: "Profile analyzed and stored successfully",
      profile: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching GitHub profile",
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await profileModel.getAllProfiles();
    res.json({
      success: true,
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await profileModel.getProfileByUsername(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: `Profile '${username}' not found in database`,
      });
    }

    res.json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};