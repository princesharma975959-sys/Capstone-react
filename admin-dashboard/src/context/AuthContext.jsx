import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  const [users, setUsers] = useState([]);

  // 🔥 LOAD USERS (API + custom names + localStorage)
  useEffect(() => {
    const saved = localStorage.getItem("users");

    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          // ✅ CUSTOM NAMES
          const customNames = [
            "Priyansh",
            "Rahul",
            "Amit",
            "Karan",
            "Vansh"
          ];

          const formatted = data.slice(0, 5).map((u, index) => ({
            id: u.id,
            name: customNames[index], // 👈 name change
            role: index === 0 ? "Admin" : "User",
            status: "Active",
            tasks: u.id % 5,
          }));

          setUsers(formatted);
          localStorage.setItem("users", JSON.stringify(formatted));
        })
        .catch(() => {
          // fallback
          const fallback = [
            {
              id: 1,
              name: "Offline User",
              role: "User",
              status: "Active",
              tasks: 2,
            },
          ];
          setUsers(fallback);
        });
    }
  }, []);

  // 🔥 AUTO SAVE
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // 🔐 LOGIN
  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "1234") {
      const admin = { role: "admin", email };
      setUser(admin);
      localStorage.setItem("user", JSON.stringify(admin));
      return true;
    }

    if (email === "user@gmail.com" && password === "1234") {
      const userData = { role: "user", email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ CRUD
  const addUser = (newUser) => {
    const userWithId = { ...newUser, id: Date.now() };
    setUsers((prev) => [...prev, userWithId]);
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateUser = (id, updatedData) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedData } : u))
    );
  };

  // TASK FUNCTIONS
  const assignTask = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, tasks: u.tasks + 1, status: "Active" } : u
      )
    );
  };

  const removeTask = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, tasks: Math.max(0, u.tasks - 1) }
          : u
      )
    );
  };

  const completeTask = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "Completed" } : u
      )
    );
  };

  const resetTask = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "Active" } : u
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        users,
        addUser,
        deleteUser,
        updateUser,
        assignTask,
        removeTask,
        completeTask,
        resetTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);