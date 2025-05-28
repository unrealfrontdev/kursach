import React from 'react';

const PopularGames = () => {
  const games = [
    { name: 'DOTA 2', icon: 'D' },
    { name: 'Counter-Strike 2', icon: 'CS' },
    { name: 'Apex Legends', icon: 'AL' },
    { name: 'Valorant', icon: 'V' },
    { name: 'League of Legends', icon: 'LL' },
    { name: 'Fortnite', icon: 'F' },
    { name: 'Overwatch 2', icon: 'OW' },
    { name: 'Rocket League', icon: 'RL' },
    { name: 'Cyberpunk 2077', icon: 'CP' }
  ];

  return (
    <div 
      className="text-white p-4"
      style={{
        backgroundColor: '#000000',
        minHeight: '100vh'
      }}
    >
      <div className="container-fluid">
        {/* Верхняя фиолетовая линия */}
        <div 
          style={{
            height: '4px',
            backgroundColor: '#8a2be2',
            marginBottom: '30px'
          }}
        ></div>

        {/* Заголовок */}
        <h2 className="text-center text-white mb-5" style={{fontSize: '2.5rem', fontWeight: 'normal'}}>
          Популярные игры
        </h2>
        
        {/* Сетка игр - 3 ряда по 3 игры */}
        <div className="row g-0">
          {games.map((game, index) => (
            <div key={index} className="col-4 mb-4">
              <div className="px-2">
                {/* Фиолетовая линия над каждой игрой */}
                <div 
                  style={{
                    height: '3px',
                    backgroundColor: '#8a2be2',
                    marginBottom: '15px'
                  }}
                ></div>
                
                {/* Карточка игры */}
                <div 
                  className="d-flex align-items-center"
                  style={{
                    backgroundColor: '#000000',
                    minHeight: '60px'
                  }}
                >
                  <div 
                    className="me-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#cc3333',
                      border: '2px solid #ffffff',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: 'white',
                      flexShrink: 0
                    }}
                  >
                    {game.icon}
                  </div>
                  <div className="flex-grow-1">
                    <span className="text-white" style={{fontSize: '1rem', fontWeight: 'normal'}}>
                      {game.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularGames;