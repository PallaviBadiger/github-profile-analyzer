const express = require("express");
require("dotenv").config();
const githubRoutes = require("./routes/githubRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 GitHub Profile Analyzer API is running");
});

app.use("/api", githubRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});