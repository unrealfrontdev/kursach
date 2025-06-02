import React, { useState } from 'react';

const GameCard = ({
  gameName = "DOTA2",
  gameIcon = "D",
  description = "",
  user,
  onUserUpdate
}) => {
  const [loading, setLoading] = useState(false);
  const [teamDescription, setTeamDescription] = useState('');

  const hasRequest = user?.selected_game === gameName;

  // Функция для получения пути к логотипу игры
  const getGameLogo = (gameName) => {
    const logos = {
      'DOTA 2': '/dota2_logo.png',
      'Counter-Strike 2': '/counterstrike2_logo.png',
      'Apex Legends': '/Apex_logo.svg',
      'Valorant': '/Valorant_logo.svg.png',
      'League of Legends': '/League_of_Legends_logo.svg',
      'Fortnite': '/fortnite_logo.svg',
      'Overwatch 2': '/Overwatch_logo.png',
      'Rocket League': '/Rocket_League_logo.svg',
      'Cyberpunk 2077': '/Cyberpunk_2077_logo.svg'
    };
    return logos[gameName];
  };

  const handleApply = async () => {
    setLoading(true);
    await fetch(`http://localhost:3001/users/${user.id}/select-game`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        game: gameName,
        teamDescription: teamDescription 
      })
    });
    onUserUpdate && onUserUpdate({ 
      ...user, 
      selected_game: gameName,
      team_description: teamDescription 
    });
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
          
          .game-logo {
            width: 50px;
            height: 50px;
            object-fit: contain;
            background-color: transparent;
            border: none;
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
            .game-logo {
              width: 40px;
              height: 40px;
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
            .game-logo {
              width: 35px;
              height: 35px;
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

        {/* Заголовок с логотипом */}
        <div className="d-flex align-items-center mb-4">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'transparent',
              marginRight: '20px'
            }}
          >
            <img 
              src={getGameLogo(gameName)}
              alt={gameName}
              className="game-logo"
            />
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

        {/* Текстовое поле для описания команды */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <textarea
            placeholder="Опишите, каких союзников вы ищете..."
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            style={{
              width: '80%',
              minHeight: '100px',
              backgroundColor: 'transparent',
              border: '2px solid #8a2be2',
              borderRadius: '4px',
              color: '#ffffff',
              padding: '10px',
              marginBottom: '20px',
              resize: 'vertical',
              fontSize: '1rem'
            }}
            onFocus={(e) => e.target.style.borderColor = '#9932cc'}
            onBlur={(e) => e.target.style.borderColor = '#8a2be2'}
          />
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