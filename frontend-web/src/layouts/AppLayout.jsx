import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { signOut } from '../shared/authService';
import '../styles/Dashboard.css';

const AppLayout = ({ user, toggleTheme, isDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) console.error('Error signing out:', error.message);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Listen for logout requests dispatched from the Settings page
  useEffect(() => {
    const handler = () => handleLogout();
    window.addEventListener('ledgerai:logout', handler);
    return () => window.removeEventListener('ledgerai:logout', handler);
  }, []);

  return (
    <div className="dashboard-shell">
      <Sidebar
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
        user={user}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        onLogout={handleLogout}
      />
      <div className="dashboard-main">
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;