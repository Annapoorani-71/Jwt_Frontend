// CreatorDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

 function CreatorDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div>
      <h2>Creator Dashboard</h2>
      <p>Welcome to the Creator Dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default CreatorDashboard