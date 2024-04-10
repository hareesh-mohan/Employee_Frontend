// UserDashboard.js

import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Role: {userData.role}</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
