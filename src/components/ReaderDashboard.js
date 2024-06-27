// ReaderDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ReaderDashboard({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div>
      <h2>Reader Dashboard</h2>
      <p>Welcome to the Reader Dashboard!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default ReaderDashboard