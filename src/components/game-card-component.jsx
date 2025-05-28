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
          @media (max-width: 600px) {
            .game-card-mobile {
              max-width: 98vw !important;
              min-height: 50vh !important;
              padding: 12px !important;
            }
            .game-card-mobile h2 {
              font-size: 1.3rem !important;
            }
            .game-card-mobile p {
              font-size: 0.98rem !important;
            }
            .game-card-mobile button {
              font-size: 1rem !important;
              padding: 10px 0 !important;
            }
          }
        `}
      </style>
      <div
        className="p-4 game-card-mobile"
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          maxWidth: '38rem',
          minHeight: '70vh',
          width: '100%',
          borderTop: '4px solid #6A00A7',
          borderBottom: '4px solid #6A00A7',
          borderLeft: 'none',
          borderRight: 'none',
          borderRadius: '0',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
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