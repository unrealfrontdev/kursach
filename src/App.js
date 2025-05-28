import React, { useState, useRef } from 'react';
import Header from './components/myvibe-header.jsx';
import Footer from './components/myvibe-footer.jsx';
import MainContainer from './components/myvibe-main-background.jsx';
import SiteDescription from './components/SiteDescription.jsx';
import RegistrationForm from './components/registration-form.jsx';
import Autotization from './components/Autotization.jsx';
import ProfileCard from './components/profile-component.jsx';
import AdminUsersPanel from './components/admin-users-panel.jsx';
import PopularGames from './components/popular-games-grid.jsx'; // Импортируйте грид

import './App.css';

function App() {
  const [view, setView] = useState('main');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [showGamesGrid, setShowGamesGrid] = useState(false); // Новое состояние

  const loginRef = useRef(null);
  const registerRef = useRef(null);

  const handleAuthorized = (userData) => {
    setIsAuthorized(true);
    setUser(userData);
    if (userData.id === 9) {
      setView('admin');
    } else {
      setView('profile');
    }
  };

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
          setShowGamesGrid(false); // Закрыть грид при открытии авторизации
          setView('login');
          setTimeout(() => {
            loginRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onRegisterClick={() => {
          setShowGamesGrid(false); // Закрыть грид при открытии регистрации
          setView('register');
          setTimeout(() => {
            registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onProfileClick={() => setView('profile')}
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
          {showGamesGrid ? (
            // Показываем грид на всю центральную часть
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.98)'
              }}>
                <PopularGames />
              </div>
            </div>
          ) : (
            <>
              <div className="w-100 w-md-50 d-flex justify-content-center align-items-center order-2 order-md-1">
                {(view === 'main' || view === 'login') && (
                  <div ref={loginRef}>
                    <Autotization setIsAuthorized={handleAuthorized} />
                  </div>
                )}
                {view === 'register' && (
                  <div ref={registerRef}>
                    <RegistrationForm />
                  </div>
                )}
                {view === 'profile' && <ProfileCard user={user} />}
              </div>
              <div className="w-100 w-md-50 d-flex justify-content-center align-items-center order-1 order-md-2 mb-4 mb-md-0">
                <SiteDescription onOpenGames={() => setShowGamesGrid(true)} />
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