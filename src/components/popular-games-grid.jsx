import React from 'react';

const PopularGames = ({ onGameSelect }) => {
  const games = [
    { name: 'DOTA 2', icon: 'D', description: 'Dota 2 — MOBA, стратегия и RPG. Две команды по 5 игроков.' },
    { name: 'Counter-Strike 2', icon: 'CS', description: 'CS2 — командный шутер, террористы против спецназа.' },
    { name: 'Apex Legends', icon: 'AL', description: 'Apex — королевская битва с героями и способностями.' },
    { name: 'Valorant', icon: 'V', description: 'Valorant — тактический шутер с уникальными агентами.' },
    { name: 'League of Legends', icon: 'LL', description: 'LoL — MOBA, две команды по 5, уничтожь базу врага.' },
    { name: 'Fortnite', icon: 'F', description: 'Fortnite — королевская битва с постройками.' },
    { name: 'Overwatch 2', icon: 'OW', description: 'Overwatch — командный шутер с героями.' },
    { name: 'Rocket League', icon: 'RL', description: 'Rocket League — футбол на машинках.' },
    { name: 'Cyberpunk 2077', icon: 'CP', description: 'Cyberpunk — экшен-RPG в открытом мире.' }
  ];

  return (
    <>
      <style>
        {`
          .popular-games-grid {
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-bottom: 32px;
          }
          @media (max-width: 600px) {
            .popular-games-grid {
              min-height: calc(100vh - 120px);
              padding-bottom: 60px;
              box-sizing: border-box;
              justify-content: flex-start;
            }
            .popular-games-grid .row {
              flex-direction: column !important;
            }
            .popular-games-grid .col-4 {
              width: 100% !important;
              max-width: 100% !important;
              flex: 0 0 100% !important;
            }
            .popular-games-grid h2 {
              font-size: 1.5rem !important;
            }
            .popular-games-grid .d-flex {
              min-height: 48px !important;
            }
            .popular-games-grid .me-3 {
              width: 38px !important;
              height: 38px !important;
              font-size: 10px !important;
            }
            .popular-games-grid .px-2 {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
          }
        `}
      </style>
      <div className="w-100 popular-games-grid">
        <div className="container-fluid">
          <div 
            style={{
              height: '4px',
              backgroundColor: '#8a2be2',
              marginBottom: '30px'
            }}
          ></div>
          <h2 className="text-center text-white mb-5" style={{fontSize: '2.5rem', fontWeight: 'normal'}}>
            Популярные игры
          </h2>
          <div className="row g-0">
            {games.map((game, index) => (
              <div key={index} className="col-4 mb-4">
                <div className="px-2">
                  <div 
                    style={{
                      height: '3px',
                      backgroundColor: '#8a2be2',
                      marginBottom: '15px'
                    }}
                  ></div>
                  <div
                    className="d-flex align-items-center"
                    style={{ backgroundColor: '#000000', minHeight: '60px', cursor: 'pointer' }}
                    onClick={() => onGameSelect && onGameSelect(game)}
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
    </>
  );
};

export default PopularGames;