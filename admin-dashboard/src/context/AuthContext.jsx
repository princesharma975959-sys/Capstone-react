import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [users, setUsers] = useState([]);

  // 🔥 API से USERS LOAD
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        const formattedUsers = data.map(u => ({
          name: u.name,
          role: "User",
          status: "Active",
          tasks: Math.floor(Math.random() * 5)
        }));

        setUsers(formattedUsers);
      })
      .catch(() => {
        // fallback (अगर API fail हो जाए)
        setUsers([
          { name: "Offline User", role: "User", status: "Active", tasks: 2 }
        ]);
      });
  }, []);

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

  // ⚠️ NOTE: ये changes temporary होंगे (API fake है)

  const addUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  const deleteUser = (index) => {
    setUsers(prev => prev.filter((_, i) => i !== index));
  };

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