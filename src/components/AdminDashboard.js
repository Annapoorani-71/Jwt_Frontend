// CreatorDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

 function AdminDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the Admin Dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default AdminDashboard