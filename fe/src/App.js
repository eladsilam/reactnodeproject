import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Homepage from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";
import logo from "./assets/logo/trash_manage.jpg";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users/session")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        console.log("No active session");
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("/users/logout")
      .then(() => {
        setUser(null);
        navigate("/login");
      })
      .catch(() => {
        console.log("Error logging out");
      });
  };

  const authors = "Elad Silam 208112185\n Shai Salem 314784372";

  return (
    <div className="App">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" height="35" width="auto" />
          <h1>Elad Silam && Shai Salem Trash Management</h1>
          <img src={logo} alt="Logo" height="35" width="auto" />
        </div>

        {/* User Info with Logout Button */}
        {user && (
          <div className="user-info">
            <span>{user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Navigation Bar */}
      <nav>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={!user ? <Login setUser={setUser} /> : <Homepage />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer>
        © 2025 All Rights Reserved
        <br />
        {authors}
      </footer>
    </div>
  );
}

export default App;
