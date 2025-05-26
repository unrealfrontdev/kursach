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
            padding: 40px 0;
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
          .main-background h1,
          .main-background h2,
          .main-background h3,
          .main-background h4,
          .main-background h5,
          .main-background h6 {
            color: #ffffff;
          }
          .main-background p {
            color: #e5e7eb;
          }
        `}
      </style>
      <main className="main-background">
        <div className="main-content">
          <div className="container-fluid content-wrapper">
            {children || (
              <div className="row">
                <div className="col-12">
                  {/* Контент будет добавлен здесь */}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainContainer;