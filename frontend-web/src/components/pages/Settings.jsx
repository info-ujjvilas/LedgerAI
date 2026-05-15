import React from 'react';
import { ICONS } from '../Icons';
import { useAuth } from '../../shared/hooks/useAuth';
import '../../styles/Settings.css';

const Settings = ({ toggleTheme, isDarkMode }) => {
  const { user } = useAuth();
  const email = user?.email || '—';

  return (
    <div className="settings-container">
      <div className="page-header">
        <div className="header-title">
          <h1>Settings</h1>
          <p>Manage your account and app preferences.</p>
        </div>
      </div>

      <div className="settings-content">
        {/* ── Profile ── */}
        <div className="settings-card">
          <div className="card-header">
            <span className="card-icon">👤</span>
            <h2>Profile</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="static-field">
                {email}
                <span className="lock-badge">System Locked</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Appearance ── */}
        <div className="settings-card">
          <div className="card-header">
            <span className="card-icon">🎨</span>
            <h2>Appearance</h2>
          </div>
          <div className="card-body">
            <div className="settings-row">
              <div className="row-info">
                <h3>Theme</h3>
                <p>{isDarkMode ? 'Dark mode is currently active' : 'Light mode is currently active'}</p>
              </div>
              <button 
                className="theme-toggle-btn" 
                onClick={toggleTheme}
              >
                {isDarkMode ? <ICONS.Sun /> : <ICONS.Moon />}
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Account ── */}
        <div className="settings-card">
          <div className="card-header">
            <span className="card-icon">🔐</span>
            <h2>Account</h2>
          </div>
          <div className="card-body">
            <div className="settings-row">
              <div className="row-info">
                <h3>Sign out</h3>
                <p>You will be returned to the login screen. Your session will be cleared.</p>
              </div>
              <button 
                className="logout-action-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('ledgerai:logout'))}
              >
                <ICONS.Logout />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
