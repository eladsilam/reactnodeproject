import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/users/register",
        {
          username,
          email,
          password,
          role,
        }
      );
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
