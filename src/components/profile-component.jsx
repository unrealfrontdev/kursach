import React from 'react';

const ProfileCard = ({ user }) => {
  const profileCardStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    borderTop: '4px solid #6A00A7',
    borderBottom: '4px solid #6A00A7',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '38rem',
    minHeight: '70vh',
    borderRadius: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center' // центрирование по вертикали
  };

  const gradientLineStyle = {
    height: '2px',
    background: 'linear-gradient(to right, #8B5CF6, #A855F7)',
    borderRadius: '1px'
  };

  const labelTextStyle = {
    fontSize: '0.875rem',
    color: '#9CA3AF'
  };

  const usernameStyle = {
    fontSize: '1.25rem',
    fontWeight: '600'
  };

  const profileTitleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold'
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={profileCardStyle}>
        <div style={{ backgroundColor: 'transparent', border: 'none', textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <h1 style={profileTitleStyle} className="mb-0">Профиль</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '3rem' }}>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center', width: '100%' }}>
            <div style={usernameStyle} className="mb-2">{user?.username || ''}</div>
            <div style={gradientLineStyle} className="mb-2"></div>
            <div style={labelTextStyle}>имя пользователя</div>
          </div>
          <div style={{ marginBottom: '2.5rem', textAlign: 'center', width: '100%' }}>
            <div style={usernameStyle} className="mb-2">{user?.telegram || ''}</div>
            <div style={gradientLineStyle} className="mb-2"></div>
            <div style={labelTextStyle}>ссылка на telegram</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;