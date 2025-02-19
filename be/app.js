const express = require("express");
const db = require("./dbSingleton").getConnection(); // Ensure the DB connection is properly initialized

const app = express();
const port = 8801;

// Import routes
const articlesRoutes = require("./articles");
const userRoutes = require("./users")

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/articles", articlesRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
