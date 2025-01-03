import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Manager {
  role: string;
  userRole: string;
  username: string;
}

export default function ManagerDashboard() {
  const [user, setUser] = useState<Manager | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');

    if (!token || userRole !== 'Manager') {
      navigate('/login');
    } else {
      // Fetch or display the user data
      setUser({
        role: 'Manager',
        userRole: userRole!,
        username: username!,
      });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Manager Dashboard</h1> {/* Fixed title from "Admin Dashboard" to "Manager Dashboard" */}
      {user && (
        <div>
          <p>Welcome, {user.username}</p>
          {/* Add more manager-related content here */}
        </div>
      )}
    </div>
  );
}
