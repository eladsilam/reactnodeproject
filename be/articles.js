// routes/articles.js
const express = require("express");
const router = express.Router();
const db = require("./dbSingleton").getConnection();


// Fetch all articles with author info
router.get("/all-articles", (req, res) => {
  db.query(
    `SELECT articles.id, articles.title, articles.content, articles.author_id, users.username AS author 
     FROM articles 
     JOIN users ON articles.author_id = users.id`,
    (err, results) => {
      if (err) {
        console.error("❌ Error fetching articles:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      console.log("📌 Articles fetched:", results); // ✅ לבדוק בשרת שה-author_id קיים

      res.json({ articles: results });
    }
  );
});


// Delete an article (Only the author can delete)
router.delete("/:id", (req, res) => {
  const articleId = req.params.id;
  const userId = req.session.user?.id; // המשתמש המחובר

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // בדיקה אם המשתמש כתב את המאמר
  db.query("SELECT author_id FROM articles WHERE id = ?", [articleId], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (results[0].author_id !== userId) {
      return res.status(403).json({ message: "You can only delete your own articles" });
    }

    // מחיקת המאמר
    db.query("DELETE FROM articles WHERE id = ?", [articleId], (err) => {
      if (err) return res.status(500).json({ message: "Error deleting article" });

      res.json({ message: "Article deleted successfully" });
    });
  });
});


// Update an article (Only the author can edit)
router.put("/:id", (req, res) => {
  const articleId = req.params.id;
  const { title, content } = req.body;
  const userId = req.session.user?.id; // המשתמש המחובר

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // בדיקה שהמשתמש הוא הבעלים של המאמר
  db.query("SELECT author_id FROM articles WHERE id = ?", [articleId], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (results.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (results[0].author_id !== userId) {
      return res.status(403).json({ message: "You can only edit your own articles" });
    }

    // עדכון המאמר
    db.query(
      "UPDATE articles SET title = ?, content = ? WHERE id = ?",
      [title, content, articleId],
      (err) => {
        if (err) return res.status(500).json({ message: "Error updating article" });

        res.json({ message: "Article updated successfully" });
      }
    );
  });
});


// Add a new article
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const user = req.session.user;

  if (!user) {
    console.log("❌ Unauthorized user tried to add an article.");
    return res.status(401).json({ message: "Unauthorized - Please log in." });
  }

  console.log(`📝 Adding new article: Title: ${title}, Content: ${content}, Author ID: ${user.id}`);

  db.query(
    "INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)",
    [title, content, user.id],
    (err, result) => {
      if (err) {
        console.error("❌ Error adding article to database:", err);
        return res.status(500).json({ message: "Error adding article" });
      }

      console.log("✅ Article added to database with ID:", result.insertId);

      res.json({
        message: "Article added successfully",
        article: { id: result.insertId, title, content, author_id: user.id },
      });
    }
  );
});



// Add new article
router.post("/", (req, res, next) => {
  const { title, content, author_id } = req.body;
  if (!title || !content || !author_id)
    return res.status(400).json({ message: "Missing required fields" });

  const query =
    "INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)";
  db.query(query, [title, content, author_id], (err, result) => {
    if (err) return next(err);
    res.json({
      message: `Article added successfully`,
      articleId: result.insertId,
    });
  });
});



// Delete article by ID
router.delete("/:id", (req, res, next) => {
  const query = "DELETE FROM articles WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return next(err);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Article not found" });
    res.json({ message: `Article ${req.params.id} deleted successfully` });
  });
});

// Get articles by author
router.get("/author/:author", (req, res, next) => {
  const query = "SELECT * FROM articles WHERE author_id = ?";
  db.query(query, [req.params.author], (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

// Get articles created after a certain date
router.get("/after/:date", (req, res, next) => {
  const query = "SELECT * FROM articles WHERE created_at > ?";
  db.query(query, [req.params.date], (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

// Get articles sorted by creation date (newest first)
router.get("/sorted", (req, res, next) => {
  const query = "SELECT * FROM articles ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

// Get total count of articles
router.get("/count", (req, res, next) => {
  const query = "SELECT COUNT(*) AS total FROM articles";
  console.log(`The Query is : ${query}`);
  db.query(query, (err, results) => {
    console.log(`The error is :${err}`);
    console.log(`The result is : ${results}`);
    if (err) return next(err);
    res.json(results[0]);
  });
});

// Search articles by keyword in title
router.get("/search/:keyword", (req, res, next) => {
  const query = "SELECT * FROM articles WHERE title LIKE ?";
  db.query(query, [`%${req.params.keyword}%`], (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

// Get unique authors
router.get("/authors", (req, res, next) => {
  const query = "SELECT DISTINCT author FROM articles";
  db.query(query, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});
// Get all articles
router.get("/", (req, res, next) => {
  const query = "SELECT * FROM articles";
  db.query(query, (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
});

// Get article by ID
router.get("/:id", (req, res, next) => {
  const query = "SELECT * FROM articles WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return next(err);
    if (results.length === 0)
      return res.status(404).json({ message: "Article not found" });
    res.json(results[0]);
  });
});
// Lets notice that if an article id doesn't exists it will still compile the SQL query

router.put("/update", (req, res, next) => {
  const { id, title, content, author_id } = req.body;
  if (!id || !title || !content || !author_id)
    return res.status(400).json({
      message: "Missing required fields",
    });
  const query = `
    UPDATE articles
    set articles.title = ? , articles.content = ?, articles.author_id = ?
    WHERE articles.id = ?
    `;
  db.query(query, [title, content, author_id, id], (err, result) => {
    if (err) {
      res.json({
        message: "Failed to update article",
      });
    }
    res.json({
      message: "Article Updated successfully",
      articleId: id,
    });
  });
});

module.exports = router;
