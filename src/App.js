import React, { useState } from 'react';
import Header from './components/myvibe-header.jsx';
import Footer from './components/myvibe-footer.jsx';
import MainContainer from './components/myvibe-main-background.jsx';
import SiteDescription from './components/SiteDescription.jsx';
import RegistrationForm from './components/registration-form.jsx';
import Autotization from './components/Autotization.jsx';
import ProfileCard from './components/profile-component.jsx'; // импортируйте профиль

import './App.css';

function App() {
  const [view, setView] = useState('main');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null); // добавлено

  // При успешной авторизации сохраняем пользователя и показываем профиль
  const handleAuthorized = (userData) => {
    setIsAuthorized(true);
    setUser(userData); // сохраняем данные пользователя
    setView('profile');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#000000'
    }}>
      <Header
        onLoginClick={() => setView('login')}
        onRegisterClick={() => setView('register')}
        onProfileClick={() => setView('profile')}
        isAuthorized={isAuthorized}
      />
      <MainContainer style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ minHeight: '100%' }} className="d-flex flex-column flex-md-row justify-content-between align-items-center w-100">
          <div className="w-100 w-md-50 d-flex justify-content-center align-items-center order-2 order-md-1">
            {view === 'main' && <Autotization setIsAuthorized={handleAuthorized} />}
            {view === 'login' && <Autotization setIsAuthorized={handleAuthorized} />}
            {view === 'register' && <RegistrationForm />}
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