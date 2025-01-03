import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
}

interface UserTasksProps {
  userId: number;
}

const UserTasks = ({ userId }: UserTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data.tasks);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTasks();
  }, [userId, token]);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;
