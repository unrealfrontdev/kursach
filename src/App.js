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

import './App.css';

function App() {
  const [view, setView] = useState('main');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [showGamesGrid, setShowGamesGrid] = useState(false); // Новое состояние
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameApplicants, setGameApplicants] = useState([]);
  const [authWarning, setAuthWarning] = useState(false); // новое состояние

  const loginRef = useRef(null);
  const registerRef = useRef(null);

  const handleAuthorized = (userData) => {
    setIsAuthorized(true);
    setUser(userData);
    setShowGamesGrid(false); // Скрыть грид при входе
    if (userData.id === 9) {
      setView('admin');
    } else {
      setView('profile');
    }
  };

  // Загружать пользователей, оставивших заявку на выбранную игру
  useEffect(() => {
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
  }, [showGamesGrid, selectedGame]);

  // Если админ — показываем только панель администратора
  if (view === 'admin') {
    return <AdminUsersPanel />;
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
          setAuthWarning(false); // сброс предупреждения
          setTimeout(() => {
            loginRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onRegisterClick={() => {
          setShowGamesGrid(false);
          setView('register');
          setAuthWarning(false); // сброс предупреждения
          setTimeout(() => {
            registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onProfileClick={() => {
          setShowGamesGrid(false);
          setView('profile');
          setAuthWarning(false); // сброс предупреждения
        }}
        isAuthorized={isAuthorized}
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
              // Карточка игры слева, справа — заявки
              <div className="d-flex w-100" style={{ minHeight: '70vh' }}>
                <div className="w-100 w-md-50 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                  <GameCard
                    gameName={selectedGame.name}
                    gameIcon={selectedGame.icon}
                    description={selectedGame.description}
                    user={user}
                    onUserUpdate={setUser}
                  />
                </div>
                <div className="w-100 w-md-50 d-flex flex-column align-items-center" style={{ minHeight: '70vh', overflowY: 'auto' }}>
                  <h3 className="text-white mb-3" style={{ fontWeight: 'normal', fontSize: '1.5rem' }}>Заявки на игру</h3>
                  {gameApplicants.length === 0 ? (
                    <div className="text-white-50">Нет заявок</div>
                  ) : (
                    gameApplicants.map(applicant => (
                      <div key={applicant.id} className="mb-3 w-100" style={{ maxWidth: 600 }}>
                        <GameBanner user={applicant} />
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              // Если игра не выбрана — грид на всю ширину
              <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
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
                      <div style={{ color: '#ff4d4f', marginTop: 16, fontSize: '1.1rem', textAlign: 'center' }}>
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
                      <div style={{ color: '#ff4d4f', marginTop: 16, fontSize: '1.1rem', textAlign: 'center' }}>
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