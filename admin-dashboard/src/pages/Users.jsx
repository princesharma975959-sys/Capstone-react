import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const { users, addUser, deleteUser, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [role, setRole] = useState("User");
  const [editIndex, setEditIndex] = useState(null);

  // ADD
  const handleAdd = () => {
    if (!name.trim()) return;

    addUser({
      name,
      role,
      status: "Active",
      tasks: 0
    });

    setName("");
  };

  // 🔥 UPDATE (NO RELOAD)
  const handleUpdate = () => {
    updateUser(editIndex, { name, role });

    setEditIndex(null);
    setName("");
  };

  return (
    <div>
      <h2>Users</h2>

      {/* FORM */}
      <div className="form-box">
        <h3>{editIndex !== null ? "Edit User" : "Add User"}</h3>

        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>User</option>
          <option>Admin</option>
        </select>

        <button onClick={editIndex !== null ? handleUpdate : handleAdd}>
          {editIndex !== null ? "Update User" : "Add User"}
        </button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Tasks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.role}</td>

              <td>
                <span className="status active">Active</span>
              </td>

              <td>{u.tasks}</td>

              <td>
                {/* DELETE */}
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(i)}
                >
                  Delete
                </button>

                {/* EDIT */}
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditIndex(i);
                    setName(u.name);
                    setRole(u.role);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}