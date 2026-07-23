import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { FileText, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const onLogout = () => {
    handleLogout();
    navigate('/login'); // Logout hote hi login page par bhej do
  };

  return (
    <nav style={{
      display: 'flex',
      width:'100%',
      boxSizing:'border-box',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#161b22',
      borderBottom: '1px solid #2a3348',
      color: '#e6edf3'
    }}>
      {/* Logo / Title */}
      <div 
        onClick={() => navigate('/dashboard')} 
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
      >
        <FileText color="#ff2d78" size={24} />
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>CoreCV</span>
      </div>

      {/* Right Side: Profile Info + Logout Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user && (
          <span style={{ fontSize: '0.875rem', color: '#7d8590' }}>
            Hi, <strong style={{ color: '#e6edf3' }}>{user.firstName || user.username || 'User'}</strong>
          </span>
        )}
        
        <button 
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255, 45, 120, 0.1)',
            color: '#ff2d78',
            border: '1px solid rgba(255, 45, 120, 0.3)',
            position:'relative',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;