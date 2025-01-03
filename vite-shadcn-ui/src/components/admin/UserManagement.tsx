import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
}

interface UserManagementProps {
  setSelectedUserId: (id: number | null) => void;
}

const UserManagement = ({ setSelectedUserId }: UserManagementProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUserId(user.id)} className="cursor-pointer">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
