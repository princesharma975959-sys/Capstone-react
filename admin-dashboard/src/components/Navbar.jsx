import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  const [dark, setDark] = useState(true);

  // Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.body.classList.add("light");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (dark) {
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }

    setDark(!dark);
  };

  return (
    <div className="navbar">
      <h3>Admin Panel</h3>

      <div style={{ display: "flex", gap: "10px" }}>
        {/* 🌙 THEME BUTTON */}
        <button onClick={toggleTheme} className="theme-btn">
          {dark ? "🌙" : "☀️"}
        </button>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}