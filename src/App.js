import React, { useState, useRef } from 'react';
import Header from './components/myvibe-header.jsx';
import Footer from './components/myvibe-footer.jsx';
import MainContainer from './components/myvibe-main-background.jsx';
import SiteDescription from './components/SiteDescription.jsx';
import RegistrationForm from './components/registration-form.jsx';
import Autotization from './components/Autotization.jsx';
import ProfileCard from './components/profile-component.jsx'; // импортируйте профиль
import AdminUsersPanel from './components/admin-users-panel.jsx';

import './App.css';

function App() {
  const [view, setView] = useState('main');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  // Создаём ref для якорей
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
          setView('login');
          setTimeout(() => {
            loginRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onRegisterClick={() => {
          setView('register');
          setTimeout(() => {
            registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 0);
        }}
        onProfileClick={() => setView('profile')}
        isAuthorized={isAuthorized}
      />
      <MainContainer style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ minHeight: '100%' }} className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100">
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
            <SiteDescription />
          </div>
        </div>
      </MainContainer>
      <Footer />
    </div>
  );
}

export default App;