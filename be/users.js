const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./dbSingleton").getConnection();

// Add new user
router.post("/register", (req, res, next) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role)
    return res.status(400).json({ message: "Missing required fields" });

  // Generate salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;

    // Hashing password with salt
    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) throw err;
      // Save hashedPassword to database
      console.log(`Original passoword : ${password}`);
      console.log("Hashed password with salt:", hashedPassword);

      const query =
        "INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)";
      db.query(
        query,
        [username, email, hashedPassword, role],
        (err, result) => {
          if (err) return next(err);
          res.json({
            message: `User added successfully`,
            id: result.insertId,
          });
        }
      );
    });
  });
});

module.exports = router;
