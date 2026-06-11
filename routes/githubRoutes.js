const express = require("express");
const router = express.Router();
const githubController = require("../controllers/githubController");

router.get("/analyze/:username", githubController.analyzeProfile);
router.get("/profiles", githubController.getAllProfiles);
router.get("/profiles/:username", githubController.getProfile);

module.exports = router;