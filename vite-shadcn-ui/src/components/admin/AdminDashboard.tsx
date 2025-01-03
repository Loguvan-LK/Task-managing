import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  role: string;
  userRole: string;
  username: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    const username = localStorage.getItem("username");

    if (!token || userRole !== "Admin" || !username) {
      navigate("/login");
    } else {
      setUser({
        role: "Admin",
        userRole: userRole!,
        username: username!,
      });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.username}</p>
          {/* Additional admin-related content */}
        </div>
      )}
    </div>
  );
}
