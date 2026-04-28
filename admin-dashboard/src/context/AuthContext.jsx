import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  // LOAD DATA
  useEffect(() => {
    const saved = localStorage.getItem("users");

    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
          const formatted = data.slice(0, 5).map(u => ({
            name: u.name,
            role: "User",
            status: "Active",
            tasks: Math.floor(Math.random() * 5)
          }));

          setUsers(formatted);
          localStorage.setItem("users", JSON.stringify(formatted));
        });
    }
  }, []);

  // AUTO SAVE
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // LOGIN
  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "123") {
      setUser({ role: "admin" });
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      return true;
    }

    if (email === "user@gmail.com" && password === "123") {
      setUser({ role: "user" });
      localStorage.setItem("user", JSON.stringify({ role: "user" }));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ADD USER
  const addUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  // DELETE USER
  const deleteUser = (index) => {
    setUsers(prev => prev.filter((_, i) => i !== index));
  };

  // UPDATE USER
  const updateUser = (index, updatedData) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index ? { ...u, ...updatedData } : u
      )
    );
  };

  // ASSIGN TASK
  const assignTask = (index) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index
          ? { ...u, tasks: (u.tasks || 0) + 1, status: "Active" }
          : u
      )
    );
  };

  // REMOVE TASK
  const removeTask = (index) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index
          ? { ...u, tasks: Math.max(0, (u.tasks || 0) - 1) }
          : u
      )
    );
  };

  // COMPLETE TASK
  const completeTask = (index) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index ? { ...u, status: "Completed" } : u
      )
    );
  };

  // RESET TASK
  const resetTask = (index) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index ? { ...u, status: "Active" } : u
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
        resetTask
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);