import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
}

const TaskAssignment = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/users-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) {
      setError("Please select a user to assign the task to.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        {
          ...taskDetails,
          assigneeId: selectedUser,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage(response.data.message);
      setTaskDetails({ title: "", description: "", deadline: "" });
      setSelectedUser(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating task");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Task Assignment</h1>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleTaskSubmit}>
        <label>
          Select User:
          <select
            value={selectedUser || ""}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
          >
            <option value="" disabled>
              Select a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </label>

        <div>
          <label>
            Task Title:
            <input
              type="text"
              value={taskDetails.title}
              onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Task Description:
            <textarea
              value={taskDetails.description}
              onChange={(e) =>
                setTaskDetails({ ...taskDetails, description: e.target.value })
              }
              required
            ></textarea>
          </label>
        </div>

        <div>
          <label>
            Deadline:
            <input
              type="datetime-local"
              value={taskDetails.deadline}
              onChange={(e) => setTaskDetails({ ...taskDetails, deadline: e.target.value })}
              required
            />
          </label>
        </div>

        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default TaskAssignment;
