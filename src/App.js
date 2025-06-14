import React, { useState, useRef, useEffect } from 'react';
import Header from './components/myvibe-header.jsx';
import Footer from './components/myvibe-footer.jsx';
import MainContainer from './components/myvibe-main-background.jsx';
import SiteDescription from './components/SiteDescription.jsx';
import RegistrationForm from './components/registration-form.jsx';
import Autotization from './components/Autotization.jsx';
import ProfileCard from './components/profile-component.jsx';
import AdminUsersPanel from './components/admin-users-panel.jsx';
import PopularGames from './components/popular-games-grid.jsx'; // Импортируйте грид
import GameCard from './components/game-card-component.jsx';
import GameBanner from './components/game-banner.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const [view, setView] = useState('main');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [showGamesGrid, setShowGamesGrid] = useState(false); // Новое состояние
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameApplicants, setGameApplicants] = useState([]);
  const [authWarning, setAuthWarning] = useState(false); // новое состояние
  const [filterText, setFilterText] = useState(''); // 1. состояние для фильтра

  const loginRef = useRef(null);
  const registerRef = useRef(null);

  // При инициализации читаем localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthorized');
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthorized(true);
      setView(JSON.parse(savedUser).id === 9 ? 'admin' : 'profile');
    }
  }, []);

  const handleAuthorized = (userData) => {
    setIsAuthorized(true);
    setUser(userData);
    setShowGamesGrid(false);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthorized', 'true');
    if (userData.id === 9) {
      setView('admin');
    } else {
      setView('profile');
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setUser(null);
    setView('main');
    setShowGamesGrid(false);
    setSelectedGame(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthorized');
  };

  // Загружать пользователей, оставивших заявку на выбранную игру
  useEffect(() => {
    let intervalId;

    function fetchApplicants() {
      if (showGamesGrid && selectedGame) {
        fetch(`http://localhost:3001/users`)
          .then(res => res.json())
          .then(data => {
            setGameApplicants(
              (data.users || []).filter(
                u => u.selected_game === selectedGame.name
              )
            );
          });
      } else {
        setGameApplicants([]);
      }
    }

    fetchApplicants(); // начальная загрузка

    if (showGamesGrid && selectedGame) {
      intervalId = setInterval(fetchApplicants, 1); // обновление каждую миллисекунду
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showGamesGrid, selectedGame]);

  // Если админ — показываем только панель администратора
  if (view === 'admin') {
    return <AdminUsersPanel onLogout={handleLogout} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#000000'
    }}>
      <Header
        onLoginClick={() => {
          setShowGamesGrid(false);
          setView('login');
          setAuthWarning(false);
          setTimeout(() => {
            loginRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onRegisterClick={() => {
          setShowGamesGrid(false);
          setView('register');
          setAuthWarning(false);
          setTimeout(() => {
            registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onProfileClick={() => {
          setShowGamesGrid(false);
          setView('profile');
          setAuthWarning(false);
        }}
        isAuthorized={isAuthorized}
        onLogout={handleLogout}
        onPopularGamesClick={() => {
          setShowGamesGrid(true);
          setSelectedGame(null);
          setView('main');
          setAuthWarning(false);
        }}
      />
      <MainContainer style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            minHeight: '100%',
            position: 'relative',
          }}
          className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100"
        >
          {showGamesGrid && isAuthorized ? (
            selectedGame ? (
              <div className="d-flex flex-column w-100">
                <style>
                {`
                  @media (max-width: 768px) {
                    .game-container {
                      flex-direction: column !important;
                      padding: 10px !important;
                    }
                    .game-card-container {
                      width: 100% !important;
                      margin-bottom: 20px !important;
                    }
                    .applicants-container {
                      width: 100% !important;
                      padding: 0 10px !important;
                    }
                    .applicants-title {
                      font-size: 1.25rem !important;
                      margin: 15px 0 !important;
                    }
                  }
                  .game-container {
                    width: 100%;
                    display: flex;
                    gap: 20px;
                    padding: 20px;
                  }
                  .game-card-container {
                    width: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                  }
                  .applicants-container {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-height: 70vh;
                    overflow-y: auto;
                  }
                  .applicants-title {
                    color: white;
                    font-weight: normal;
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                  }
                `}
                </style>
                <div className="game-container">
                  <div className="game-card-container">
                    <GameCard
                      gameName={selectedGame.name}
                      gameIcon={selectedGame.icon}
                      description={selectedGame.description}
                      user={user}
                      onUserUpdate={setUser}
                    />
                  </div>
                  <div className="applicants-container">
                    <h3 className="applicants-title">Заявки на игру</h3>
                    {/* 2. input для фильтра */}
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="Фильтр по слову..."
                      value={filterText}
                      onChange={e => setFilterText(e.target.value)}
                      style={{
                        maxWidth: 300,
                        background: 'linear-gradient(90deg, #1a0033 0%, #6A00A7 100%)',
                        color: '#fff',
                        border: '1.5px solid #6A00A7',
                        borderRadius: '8px',
                        fontWeight: 500,
                        boxShadow: '0 2px 10px rgba(106,0,167,0.15)',
                        outline: 'none'
                      }}
                    />
                    <style>
                    {`
                      .form-control::placeholder {
                        color: #e0d6f7 !important;
                        opacity: 1;
                      }
                    `}
                    </style>
                    {/* 3. фильтрация заявок */}
                    {gameApplicants.filter(applicant => {
                      const word = filterText.trim().toLowerCase();
                      if (!word) return true;
                      return (
                        (applicant.username && applicant.username.toLowerCase().includes(word)) ||
                        (applicant.telegram && applicant.telegram.toLowerCase().includes(word)) ||
                        (applicant.team_description && applicant.team_description.toLowerCase().includes(word))
                      );
                    }).length === 0 ? (
                      <div className="text-white-50">Нет заявок</div>
                    ) : (
                      gameApplicants
                        .filter(applicant => {
                          const word = filterText.trim().toLowerCase();
                          if (!word) return true;
                          return (
                            (applicant.username && applicant.username.toLowerCase().includes(word)) ||
                            (applicant.telegram && applicant.telegram.toLowerCase().includes(word)) ||
                            (applicant.team_description && applicant.team_description.toLowerCase().includes(word))
                          );
                        })
                        .map(applicant => (
                          <div key={applicant.id} className="mb-3 w-100" style={{ maxWidth: 600 }}>
                            <GameBanner user={applicant} />
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Убираем минимальную высоту и отступ сверху
              <div className="w-100 d-flex justify-content-center align-items-start">
                <PopularGames onGameSelect={setSelectedGame} />
              </div>
            )
          ) : (
            <>
              <div className="w-100 w-md-50 d-flex flex-column justify-content-center align-items-center order-2 order-md-1">
                {(view === 'main' || view === 'login') && (
                  <>
                    <div ref={loginRef}>
                      <Autotization setIsAuthorized={handleAuthorized} />
                    </div>
                    {authWarning && (
                      <div
                        style={{
                          color: 'red',
                 
                          marginTop: 20,
                       
                          textAlign: 'center',
                      
                  
                          padding: '10px 20px',
                    
                          letterSpacing: 1,
                          zIndex: 10,
                          position: 'relative'
                        }}
                      >
                        сначала нужно авторизоватся
                      </div>
                    )}
                  </>
                )}
                {view === 'register' && (
                  <>
                    <div ref={registerRef}>
                      <RegistrationForm />
                    </div>
                    {authWarning && (
                      <div
                        style={{
                          color: '#fff',
                          fontWeight: 900,
                          marginTop: 20,
                          fontSize: '1.25rem',
                          textAlign: 'center',
                          background: 'rgba(106,0,167,0.85)',
                          borderRadius: 10,
                          padding: '10px 20px',
                          boxShadow: '0 0 16px #6A00A7, 0 0 2px #000',
                          letterSpacing: 1,
                          zIndex: 10,
                          position: 'relative'
                        }}
                      >
                        сначала нужно авторизоватся
                      </div>
                    )}
                  </>
                )}
                {view === 'profile' && <ProfileCard user={user} />}
              </div>
              <div className="w-100 w-md-50 d-flex justify-content-center align-items-center order-1 order-md-2 mb-4 mb-md-0">
                <SiteDescription onOpenGames={() => { 
                  if (isAuthorized) {
                    setShowGamesGrid(true); 
                    setSelectedGame(null); 
                    setAuthWarning(false);
                  } else {
                    setView('login');
                    setAuthWarning(true); // показать предупреждение
                    setTimeout(() => {
                      loginRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 0);
                  }
                }} />
              </div>
            </>
          )}
        </div>
      </MainContainer>
      <Footer />
    </div>
  );
}

export default App;