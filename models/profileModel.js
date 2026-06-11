const db = require("../config/db");

exports.upsertProfile = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO github_profiles
        (username, name, bio, public_repos, followers, following,
         public_gists, account_created_at, profile_url, avatar_url, location, company)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        public_gists = VALUES(public_gists),
        account_created_at = VALUES(account_created_at),
        profile_url = VALUES(profile_url),
        avatar_url = VALUES(avatar_url),
        location = VALUES(location),
        company = VALUES(company),
        updated_at = CURRENT_TIMESTAMP
    `;

    const values = [
      data.login,
      data.name || null,
      data.bio || null,
      data.public_repos,
      data.followers,
      data.following,
      data.public_gists,
      new Date(data.created_at),
      data.html_url,
      data.avatar_url,
      data.location || null,
      data.company || null,
    ];

    db.query(sql, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

exports.getAllProfiles = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM github_profiles ORDER BY updated_at DESC",
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

exports.getProfileByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0] || null);
      }
    );
  });
};