import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.tasks}</td>

              <td>
                <span className={`status ${u.status?.toLowerCase()}`}>
                  {u.status}
                </span>
              </td>

              <td>
                {/* ADD TASK */}
                <button
                  onClick={() => {
                    assignTask(u.id);
                    toast("Task Assigned 📌");
                  }}
                >
                  + Task
                </button>

                {/* REMOVE TASK */}
                <button
                  onClick={() => {
                    removeTask(u.id);
                    toast("Task Removed 🗑️");
                  }}
                >
                  - Task
                </button>

                {/* COMPLETE */}
                <button
                  className="complete-btn"
                  onClick={() => {
                    completeTask(u.id);
                    toast.success("Task Completed ✅");
                  }}
                >
                  Complete
                </button>

                {/* RESET */}
                <button
                  className="reset-btn"
                  onClick={() => {
                    resetTask(u.id);
                    toast("Reset Done 🔄");
                  }}
                >
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