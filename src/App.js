// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCom from './components/LoginCom';
import ReaderDashboard from './components/ReaderDashboard';
import CreatorDashboard from './components/CreaterDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<LoginCom />} />
        <Route path="/reader-dashboard" element={<ReaderDashboard />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Add more routes as needed */}
      </Routes>

  );
}

export default App;
