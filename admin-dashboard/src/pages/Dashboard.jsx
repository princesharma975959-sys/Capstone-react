import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { users, logout, user } = useAuth();
  const navigate = useNavigate();

  const data = users.map((u) => ({
    name: u.name,
    tasks: u.tasks
  }));

  const total = users.length;
  const active = users.filter(u => u.status === "Active").length;
  const completed = users.filter(u => u.status === "Completed").length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Welcome {user?.role?.toUpperCase()} </h2>

        
      </div>

      {/* STATS */}
      <div className="grid">
        <div className="card">Total: {total}</div>
        <div className="card">Active: {active}</div>
        <div className="card">Completed: {completed}</div>
      </div>

      {/* GRAPH */}
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="tasks" fill="#22c55e" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}