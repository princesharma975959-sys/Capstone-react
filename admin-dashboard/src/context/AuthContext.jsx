import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [users, setUsers] = useState([]);

  // ✅ LOAD DATA (BEST VERSION)
  useEffect(() => {
    const saved = localStorage.getItem("users");

    if (saved) {
      setUsers(JSON.parse(saved)); // 🔥 existing data load
    } else {
      const defaultUsers = [
        { name: "Priyansh", role: "Admin", status: "Active", tasks: 5 },
        { name: "Rahul", role: "User", status: "Completed", tasks: 3 },
        { name: "Amit", role: "User", status: "Active", tasks: 4 }
      ];

      setUsers(defaultUsers);
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, []);

  // ✅ AUTO SAVE
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // LOGIN
  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "123") {
      const admin = { role: "admin" };
      setUser(admin);
      localStorage.setItem("user", JSON.stringify(admin));
      return true;
    }

    if (email === "user@gmail.com" && password === "123") {
      const userData = { role: "user" };
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

  // TASK FUNCTIONS
  const assignTask = (index) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index
          ? { ...u, tasks: (u.tasks || 0) + 1, status: "Active" }
          : u
      )
    );
  };

  const removeTask = (index) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index
          ? { ...u, tasks: Math.max(0, (u.tasks || 0) - 1) }
          : u
      )
    );
  };

  const completeTask = (index) => {
    setUsers(prev =>
      prev.map((u, i) =>
        i === index ? { ...u, status: "Completed" } : u
      )
    );
  };

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