import React, { useState } from 'react';

const GameCard = ({
  gameName = "DOTA2",
  gameIcon = "D",
  description = "",
  user,
  onUserUpdate
}) => {
  const [loading, setLoading] = useState(false);

  const hasRequest = user?.selected_game === gameName;

  const handleApply = async () => {
    setLoading(true);
    await fetch(`http://localhost:3001/users/${user.id}/select-game`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game: gameName })
    });
    onUserUpdate && onUserUpdate({ ...user, selected_game: gameName });
    setLoading(false);
  };

  const handleUnapply = async () => {
    setLoading(true);
    await fetch(`http://localhost:3001/users/${user.id}/unselect-game`, {
      method: 'POST'
    });
    onUserUpdate && onUserUpdate({ ...user, selected_game: null });
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
          .game-card {
            background-color: #000000;
            color: #ffffff;
            width: 100%;
            max-width: 38rem;
            min-height: 70vh;
            border-top: 4px solid #6A00A7;
            border-bottom: 4px solid #6A00A7;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2rem;
          }
          
          @media (max-width: 768px) {
            .game-card {
              min-height: auto;
              padding: 1.5rem;
            }
            .game-title {
              font-size: 1.5rem !important;
            }
            .game-icon {
              width: 45px !important;
              height: 45px !important;
              font-size: 16px !important;
            }
            .game-description {
              font-size: 0.9rem !important;
              margin-bottom: 1.5rem !important;
            }
            .game-button {
              width: 100% !important;
              font-size: 1rem !important;
              padding: 12px !important;
            }
          }

          @media (max-width: 480px) {
            .game-card {
              padding: 1rem;
            }
            .game-title {
              font-size: 1.25rem !important;
            }
            .game-icon {
              width: 35px !important;
              height: 35px !important;
              font-size: 14px !important;
            }
            .game-description {
              font-size: 0.85rem !important;
              margin-bottom: 1rem !important;
            }
            .game-button {
              padding: 10px !important;
            }
          }
        `}
      </style>
      <div
        className="p-4 game-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {/* Верхняя фиолетовая линия */}
        <div
          style={{
            height: '4px',
            backgroundColor: '#8a2be2',
            marginBottom: '25px'
          }}
        ></div>

        {/* Заголовок с иконкой - НАЗВАНИЕ СЛЕВА ОТ ЛОГОТИПА */}
        <div className="d-flex align-items-center mb-4">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#cc3333',
              border: '3px solid #ffffff',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white',
              flexShrink: 0,
              marginRight: '20px'
            }}
          >
            {gameIcon}
          </div>
          <h2 className="text-white mb-0" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {gameName}
          </h2>
        </div>

        {/* Описание */}
        <p
          className="text-white mb-4"
          style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '30px'
          }}
        >
          {description}
        </p>

        {/* Кнопка по центру 80% ширины */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {hasRequest ? (
            <button
              style={{
                backgroundColor: '#8a2be2',
                border: 'none',
                padding: '15px 20px',
                fontSize: '1.2rem',
                color: '#000000',
                fontWeight: 'bold',
                width: '80%',
                cursor: loading ? 'wait' : 'pointer'
              }}
              onClick={handleUnapply}
              disabled={loading}
              onMouseEnter={e => e.target.style.backgroundColor = '#9932cc'}
              onMouseLeave={e => e.target.style.backgroundColor = '#8a2be2'}
            >
              Снять заявку
            </button>
          ) : (
            <button
              style={{
                backgroundColor: '#8a2be2',
                border: 'none',
                padding: '15px 20px',
                fontSize: '1.2rem',
                color: '#000000',
                fontWeight: 'bold',
                width: '80%',
                cursor: loading ? 'wait' : 'pointer'
              }}
              onClick={handleApply}
              disabled={loading}
              onMouseEnter={e => e.target.style.backgroundColor = '#9932cc'}
              onMouseLeave={e => e.target.style.backgroundColor = '#8a2be2'}
            >
              Оставить заявку
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default GameCard;