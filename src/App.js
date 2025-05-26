import React from 'react';
import Header from './components/myvibe-header.jsx';
import Footer from './components/myvibe-footer.jsx';
import MainContainer from './components/myvibe-main-background.jsx';
import Authorization from './components/myvibe-authorization.jsx';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div className="header-spacer"></div>
      <MainContainer>
        <Authorization></Authorization>
      </MainContainer>
      <div className="footer-spacer"></div>
      <Footer />
    </div>
  );
}

export default App;
