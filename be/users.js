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

      // ✅ שמירת ה-ID של המשתמש ב-SESSION
      req.session.user = { id: user.id, email: user.email, role: user.role };
      console.log("✅ User logged in:", req.session.user); // לבדוק בשרת

      res.json({ 
        message: "User logged in successfully", 
        user: req.session.user 
      });
    });
  });
});



// Session
router.get("/session", (req, res) => {
  if (req.session.user) {
    db.query("SELECT role FROM users WHERE email = ?", [req.session.user.email], (err, rows) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (rows.length === 0) {
        return res.status(401).json({ message: "No active session" });
      }

      // אם role לא נמצא בסשן, נוסיף אותו מה-DB
      if (!req.session.user.role) {
        req.session.user.role = rows[0].role;
      }

      console.log("Session data:", req.session.user); // בדיקה במסוף
      res.json({ user: req.session.user });
    });
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


// Fetch all users (Admin only)
router.get("/all-users", (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  db.query("SELECT id, username, email, role FROM users", (err, results) => {
    if (err) {
      console.error("❌ Error fetching users:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.json({ users: results });
  });
});

// Delete a user (Admin only)
router.delete("/:id", (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const userId = req.params.id;

  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error("❌ Error deleting user:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
});

// Update a user (Admin only)
router.put("/:id", (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const userId = req.params.id;
  const { username, email, role } = req.body;

  db.query(
    "UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?",
    [username, email, role, userId],
    (err, result) => {
      if (err) {
        console.error("❌ Error updating user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated successfully" });
    }
  );
});



module.exports = router;
