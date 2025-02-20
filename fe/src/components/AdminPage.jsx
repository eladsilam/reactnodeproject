import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("/users/all-users", { withCredentials: true })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        console.error("Error fetching users:", err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/users/${id}`, { withCredentials: true })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id)); // מסיר את המשתמש מה-UI
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      });
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSave = () => {
    axios
      .put(`/users/${editUser.id}`, editUser, { withCredentials: true })
      .then(() => {
        setEditUser(null);
        fetchUsers(); // טוען מחדש את הרשימה
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome, Admin! Here is the list of all users:</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editUser.username}
                    onChange={(e) =>
                      setEditUser({ ...editUser, username: e.target.value })
                    }
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUser?.id === user.id ? (
                  <select
                    value={editUser.role}
                    onChange={(e) =>
                      setEditUser({ ...editUser, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editUser?.id === user.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditUser(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
