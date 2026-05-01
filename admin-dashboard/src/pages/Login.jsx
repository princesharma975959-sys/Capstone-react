import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Snackbar from "../components/Snackbar";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState(null);

  const showSnack = (msg, type) => {
    setSnack({ msg, type });
    setTimeout(() => setSnack(null), 2500);
  };

  const handleLogin = () => {
    if (!email || !password) {
      showSnack("Fill all fields ⚠️", "error");
      return;
    }

    const success = login(email, password);

    if (success) {
      showSnack("Login Successful 🎉", "success");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      showSnack("Invalid credentials ❌", "error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to your dashboard</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />

        <button onClick={handleLogin}>Login</button>

        {/* 👇 DEMO LOGIN INFO */}
        <p
          style={{
            marginTop: "15px",
            fontSize: "13px",
            color: "#94a3b8",
          }}
        >
          Demo Login → <br />
          Email: <b>admin@gmail.com</b> <br />
          Password: <b>1234</b>
        </p>
      </div>

      {/* 🔔 SNACKBAR */}
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