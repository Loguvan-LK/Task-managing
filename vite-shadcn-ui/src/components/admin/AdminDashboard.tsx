import { useState } from "react";
import UserManagement from "./UserManagement";
import TaskAssignment from "./TaskAssignment";
import UserTasks from "./UserTasks"; // New component for displaying user tasks

export default function AdminDashboard() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
        <UserManagement setSelectedUserId={setSelectedUserId} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Assign Tasks</h2>
        <TaskAssignment />
      </div>

      {selectedUserId && (
        <div>
          <h2 className="text-xl font-semibold mb-4">User's Tasks</h2>
          <UserTasks userId={selectedUserId} />
        </div>
      )}
    </div>
  );
}
