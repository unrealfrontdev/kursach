import React from 'react';

const MainContainer = ({ children }) => {
  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <style>
        {`
          html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          .main-background {
            background-color: #000000;
            min-height: 87vh;
            height: 87vh;
            width: 100vw;
            position: relative;
            display: flex;
            flex-direction: column;
          }
          .main-content {
            flex: 1 1 auto;
            padding: 20px 0;
            height: 100%;
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
          }
          .content-wrapper {
            color: #ffffff;
            height: 100%;
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
          }
          @media (max-width: 768px) {
            .main-background {
              min-height: 100vh;
              height: auto;
            }
            .main-content {
              padding: 10px;
            }
            .content-wrapper {
              padding: 0 15px;
            }
          }
          @media (max-width: 480px) {
            .main-content {
              padding: 5px;
            }
          }
        `}
      </style>
      <main className="main-background">
        <div className="main-content">
          <div className="container-fluid content-wrapper">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainContainer;