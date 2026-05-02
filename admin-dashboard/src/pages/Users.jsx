import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Snackbar from "../components/Snackbar";

export default function Users() {
  const { users, addUser, deleteUser, updateUser } = useAuth();

  const [name, setName] = useState("");
  const [role, setRole] = useState("User");
  const [editId, setEditId] = useState(null);
  const [snack, setSnack] = useState(null);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const showSnack = (msg, type) => {
    setSnack({ msg, type });
    setTimeout(() => setSnack(null), 2500);
  };

  // 🔍 FILTER SAFE VERSION
  const filteredUsers = users.filter((u) => {
    return (
      u.name?.toLowerCase().includes(search.toLowerCase()) &&
      (filterRole === "All" || u.role === filterRole)
    );
  });

  // ADD
  const handleAdd = () => {
    if (!name.trim()) {
      showSnack("Enter valid name ⚠️", "error");
      return;
    }

    addUser({
      name,
      role,
      status: "Active",
      tasks: 0,
    });

    showSnack("User Added 🎉", "success");
    setName("");
  };

  // UPDATE
  const handleUpdate = () => {
    if (!name.trim()) {
      showSnack("Enter valid name ⚠️", "error");
      return;
    }

    updateUser(editId, { name, role });

    showSnack("User Updated ✏️", "success");

    setEditId(null);
    setName("");
    setRole("User"); // 🔥 IMPORTANT RESET
  };

  return (
    <div>
      <h2>Users</h2>

      {/* SEARCH */}
      <div className="controls">
        <input
          placeholder="Search user..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setFilterRole(e.target.value)}>
          <option>All</option>
          <option>User</option>
          <option>Admin</option>
        </select>
      </div>

      {/* FORM */}
      <div className="form-box">
        <h3>{editId !== null ? "Edit User" : "Add User"}</h3>

        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>User</option>
          <option>Admin</option>
        </select>

        <button onClick={editId !== null ? handleUpdate : handleAdd}>
          {editId !== null ? "Update User" : "Add User"}
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
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>{u.tasks}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    deleteUser(u.id);
                    showSnack("User Deleted ❌", "error");
                  }}
                >
                  Delete
                </button>

                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditId(u.id);
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

      {snack && (
        <Snackbar
          message={snack.msg}
          type={snack.type}
          onClose={() => setSnack(null)}
        />
      )}
    </div>
  );
}