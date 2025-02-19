const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./dbSingleton").getConnection(); // Ensure the DB connection is properly initialized

const app = express();
const port = 8801;

app.use(express.json()); // Middleware to parse JSON
app.use(cookieParser());
app.use(
  session({
    secret: "your_secret_key", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

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
