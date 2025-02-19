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
      console.log(`Original password : ${password}`);
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

// User login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      req.session.user = { email: user.email }; // Save session
      res.json({ message: "User logged in successfully", user: req.session.user }); // Return user
    });
  });
});
// Session
router.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: "No active session" });
  }
});


// User logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.clearCookie("connect.sid");
    res.json({ message: "User logged out successfully" });
  });
});

module.exports = router;
