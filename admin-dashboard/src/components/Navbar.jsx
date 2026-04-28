import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, dark, setDark } = useAuth();

  return (
    <div className="navbar">
      
      <h3> Admin Panel</h3>

      <div>
        <button onClick={() => setDark(!dark)}>🌙</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}