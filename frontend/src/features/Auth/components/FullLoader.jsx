import React from 'react';

const FullLoader = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0d1117',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems:'center',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255, 45, 120, 0.2)',
        borderTop: '4px solid #ff2d78',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FullLoader;