import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const { user, users, assignTask, removeTask, completeTask, resetTask } = useAuth();

  if (user?.role !== "admin") {
    return <h3>Access Denied</h3>;
  }

  return (
    <div>
      <h2>Admin Task Panel</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tasks</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.tasks}</td>

              <td>
                <span className={`status ${u.status?.toLowerCase()}`}>
                  {u.status}
                </span>
              </td>

              <td>
                <button onClick={() => assignTask(i)}>+ Task</button>
                <button onClick={() => removeTask(i)}>- Task</button>

                <button className="complete-btn" onClick={() => completeTask(i)}>
                  Complete
                </button>

                <button className="reset-btn" onClick={() => resetTask(i)}>
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}