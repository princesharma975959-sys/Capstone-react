import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>

      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/users">Users</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      
    </div>
  );
}