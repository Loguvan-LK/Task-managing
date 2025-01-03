import React, { useEffect, useState } from 'react';

const UsersOverview = () => {
  const [users, setUsers] = useState<any[]>([]); // Adjust type as needed
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('API response is not an array.');
        }
        setUsers(data);
      } catch (error: any) {
        console.error('Error fetching users:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!users.length) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h1>Users Overview</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li> // Adjust according to your data structure
        ))}
      </ul>
    </div>
  );
};

export default UsersOverview;
