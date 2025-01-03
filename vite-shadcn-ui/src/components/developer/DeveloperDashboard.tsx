import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the type for user state
interface User {
  role: string;
  userRole: string;
  username: string;
}

export default function DeveloperDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('username');

    // If no token or incorrect role, navigate to login
    if (!token || userRole !== 'Developer') {
      navigate('/login');
    } else {
      // Set user state with the role and username
      setUser({
        role: 'Developer',
        userRole: userRole || '', // Default value in case userRole is null
        username: username || '', // Default value in case username is null
      });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Developer Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          {/* Add more developer-related content here */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
