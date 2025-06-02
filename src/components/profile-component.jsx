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

  const getStatusStyle = (status) => {
    const styles = {
      'VIP': { color: '#FFD700' },
      'Alfa': { color: '#FF4500' },
      'MVP': { color: '#9400D3' },
      'MEGA': { color: '#00FF00' },
      'Z': { color: '#FF0000' }
    };
    return styles[status] || {};
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={profileCardStyle} className="profile-card">
        <div style={{ backgroundColor: 'transparent', border: 'none', textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <h1 style={profileTitleStyle} className="mb-0 profile-title">Профиль</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '3rem' }} className="profile-info">
          <div style={{ marginBottom: '2.5rem', textAlign: 'center', width: '100%' }}>
            <div style={usernameStyle} className="mb-2">
              {user?.username || ''}
              {user?.status && (
                <span style={{marginLeft: '8px', ...getStatusStyle(user.status)}}>
                  ({user.status})
                </span>
              )}
            </div>
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
      <style>
        {`
          @media (max-width: 768px) {
            .profile-card {
              width: 95% !important;
              min-height: 60vh !important;
              margin: 10px auto !important;
            }
            .profile-title {
              font-size: 1.75rem !important;
            }
            .profile-info {
              padding: 1.5rem !important;
            }
          }
          @media (max-width: 480px) {
            .profile-card {
              width: 100% !important;
              min-height: 50vh !important;
            }
            .profile-title {
              font-size: 1.5rem !important;
            }
            .profile-info {
              padding: 1rem !important;
            }
            .user-info {
              font-size: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProfileCard;