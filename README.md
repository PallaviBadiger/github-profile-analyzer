```markdown
# GitHub Profile Analyzer API

A backend REST API built with Node.js and Express that fetches GitHub user profile data using the GitHub public API and stores insights in a MySQL database.

---

## Tech Stack

- Node.js
- Express.js
- MySQL2
- Axios
- dotenv

---

## Project Structure

```
github-profile-analyzer/
├── config/
│   └── db.js
├── controllers/
│   └── githubController.js
├── models/
│   └── profileModel.js
├── routes/
│   └── githubRoutes.js
├── services/
│   └── githubService.js
├── .env
├── .gitignore
├── app.js
└── package.json
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/PallaviBadiger/github-profile-analyzer.git
cd github-profile-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=github_analyzer
PORT=3000
GITHUB_TOKEN=your_github_personal_access_token
```

### 4. Set up the database

Open MySQL and run:

```sql
CREATE DATABASE IF NOT EXISTS github_analyzer;

USE github_analyzer;

CREATE TABLE github_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(200),
  bio TEXT,
  public_repos INT DEFAULT 0,
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  public_gists INT DEFAULT 0,
  account_created_at DATETIME,
  profile_url VARCHAR(255),
  avatar_url VARCHAR(255),
  location VARCHAR(200),
  company VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. Run the server

```bash
# Development
npx nodemon app.js

# Production
node app.js
```

Server runs at `http://localhost:3000`

---

## API Endpoints

### Health Check
```
GET /
```
Response: `🚀 GitHub Profile Analyzer API is running`

---

### Analyze & Store a GitHub Profile
```
GET /api/analyze/:username
```
Fetches the profile from GitHub API and stores/updates it in MySQL.

**Example:**
```
GET /api/analyze/torvalds
```

**Response:**
```json
{
  "success": true,
  "message": "Profile analyzed and stored successfully",
  "profile": {
    "login": "torvalds",
    "name": "Linus Torvalds",
    "public_repos": 8,
    "followers": 236000,
    "following": 0
  }
}
```

---

### Get All Stored Profiles
```
GET /api/profiles
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "profiles": []
}
```

---

### Get a Single Profile by Username
```
GET /api/profiles/:username
```

**Example:**
```
GET /api/profiles/torvalds
```

**Response:**
```json
{
  "success": true,
  "profile": {
    "id": 1,
    "username": "torvalds",
    "name": "Linus Torvalds",
    "public_repos": 8,
    "followers": 236000
  }
}
```

**404 Response:**
```json
{
  "success": false,
  "message": "Profile 'username' not found in database"
}
```

---

## Stored Insights

| Field | Description |
|---|---|
| username | GitHub login handle |
| name | Display name |
| bio | Profile bio |
| public_repos | Number of public repositories |
| followers | Follower count |
| following | Following count |
| public_gists | Number of public gists |
| account_created_at | GitHub account creation date |
| profile_url | Link to GitHub profile |
| avatar_url | Profile picture URL |
| location | User's location |
| company | User's company |

---
## Live API

Base URL: https://github-profile-analyzer-production-ba37.up.railway.app

- GET /api/analyze/:username
- GET /api/profiles
- GET /api/profiles/:username
