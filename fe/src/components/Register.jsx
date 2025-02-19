import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!hasUpperCase || !hasSpecialChar || !hasMinLength) {
      return "Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    setPasswordError("");
    try {
      const response = await axios.post("/users/register", {
        username,
        email,
        password,
        role,
      });
      alert("User registered successfully!");
    } catch (error) {
      alert("Error registering user: " + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
      </div>
      <div>
        <label>Role:</label>
        <input
          type="radio"
          value="user"
          checked={role === "user"}
          onChange={() => setRole("user")}
        />
        User
        <input
          type="radio"
          value="admin"
          checked={role === "admin"}
          onChange={() => setRole("admin")}
        />
        Admin
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
