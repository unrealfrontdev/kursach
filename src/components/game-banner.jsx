import React, { useState } from 'react';

const GameBanner = ({ user }) => {
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  // Формируем ссылку на Telegram
  const tgLink = user.telegram.startsWith('@')
    ? `https://t.me/${user.telegram.slice(1)}`
    : user.telegram;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(tgLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
            .banner-status {
              align-self: flex-start !important;
            }
          }
        `}
      </style>
      <div
        className="w-100 game-banner-mobile"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{user.username}</div>
          <div
            className="tg-link-row"
            style={{
              fontSize: '0.95rem',
              color: '#aaa',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
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
        <span className="in-game-label" style={{ color: '#8a2be2', fontWeight: 700 }}>
          В игре
        </span>
      </div>
    </>
  );
};

export default GameBanner;