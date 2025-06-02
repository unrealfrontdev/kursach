import React, { useState } from 'react';

const GameBanner = ({ user }) => {
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const tgLink = user.telegram.startsWith('@')
    ? `https://t.me/${user.telegram.slice(1)}`
    : user.telegram;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tgLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
    <>
      <style>
        {`
          .game-banner {
            background: #111;
            color: #fff;
            border: 2px solid #8a2be2;
            border-radius: 10px;
            padding: 18px 24px;
            margin-bottom: 10px;
            width: 100%;
          }

          .username-container {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .status-badge {
            font-size: 0.9em;
            font-weight: bold;
          }

          @media (max-width: 768px) {
            .game-banner {
              padding: 14px 16px;
            }
            .banner-username {
              font-size: 1rem !important;
            }
            .banner-telegram {
              font-size: 0.9rem !important;
            }
            .banner-status {
              font-size: 0.9rem !important;
            }
          }

          @media (max-width: 480px) {
            .game-banner {
              padding: 12px;
            }
            .banner-username {
              font-size: 0.9rem !important;
            }
            .banner-telegram {
              font-size: 0.8rem !important;
            }
            .banner-content {
              flex-direction: column !important;
              gap: 8px !important;
            }
          }
        `}
      </style>
      <div className="w-100 game-banner-mobile" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div className="username-container">
            <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>
              {user.username}
            </span>
            {user?.status && (
              <span 
                className="status-badge"
                style={getStatusStyle(user.status)}
              >
                ({user.status})
              </span>
            )}
          </div>
        </div>
        
        {user.team_description && (
          <div style={{
            fontSize: '0.9rem',
            color: '#fff',
            backgroundColor: 'rgba(138, 43, 226, 0.1)',
            padding: '10px',
            borderRadius: '4px',
            borderLeft: '3px solid #8a2be2'
          }}>
            {user.team_description}
          </div>
        )}
        
        <div className="tg-link-row" style={{
          fontSize: '0.95rem',
          color: '#aaa',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <a
            href={tgLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#aaa', textDecoration: 'underline' }}
          >
            {user.telegram}
          </a>
          <button
            onClick={handleCopy}
            style={{
              background: 'none',
              border: 'none',
              color: '#8a2be2',
              cursor: 'pointer',
              fontSize: '1.1rem',
              padding: 0
            }}
            title="Скопировать ссылку на Telegram"
          >
            📋
          </button>
          {copied && (
            <span style={{ color: '#4caf50', fontSize: '0.95rem' }}>Скопировано!</span>
          )}
        </div>
      </div>
    </>
  );
};

export default GameBanner;