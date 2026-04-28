import { useState } from "react";

export default function DataTable({ data }) {
  const [search, setSearch] = useState("");

  const filtered = data.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Tasks</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                <span className={`status ${u.status.toLowerCase()}`}>
                  {u.status}
                </span>
              </td>
              <td>{u.tasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}