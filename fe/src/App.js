import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Articles from "./components/Articles";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminPage from "./components/AdminPage";
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
        setUser(null);
        navigate("/login"); // ✅ משתמש לא מחובר יועבר ישירות ל-LOGIN
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

  return (
    <div className="App">
      {/* אם המשתמש לא מחובר, מציגים רק את דפי LOGIN ו-REGISTER */}
      {!user ? (
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Login setUser={setUser} />} />
          </Routes>
        </main>
      ) : (
        <>
          {/* Header Section */}
          <header className="header">
            <div className="logo">
              <img src={logo} alt="Logo" height="35" width="auto" />
              <h1>Elad Silam && Shai Salem Trash Management</h1>
              <img src={logo} alt="Logo" height="35" width="auto" />
            </div>

            {/* User Info with Logout Button */}
            <div className="user-info">
              <span>{user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>

          {/* Navigation Bar */}
          <nav>
            <ul>
              <li>
                <Link to="/">Articles</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              {user && user.role === "admin" && (
                <li>
                  <Link to="/admin">Admin Page</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<Articles />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={user.role === "admin" ? <AdminPage /> : <Articles />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer>
            © 2025 All Rights Reserved
            <br />
            Elad Silam & Shai Salem
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
