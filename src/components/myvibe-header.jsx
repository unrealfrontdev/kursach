import React from 'react';

const Header = ({ onLoginClick, onRegisterClick, onProfileClick, isAuthorized }) => {
  return (
    <>

      <style>
        {`
          .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-shape {
            width: 24px;
            height: 24px;
            background: white;
            border-radius: 2px;
            transform: rotate(45deg);
          }
          .header-bg {
            background-color: #000000;
            width: 100vw;
            border-bottom: 3px solid #6A00A7;
          }
          .nav-link-custom {
            color: #d1d5db !important;
            font-size: 1.125rem;
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          .nav-link-custom:hover {
            color: #ffffff !important;
          }
          .brand-text {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            margin-bottom: 0;
          }
          @media (max-width: 442px) {
            .header-flex {
              flex-direction: column !important;
              align-items: center !important;
              text-align: center;
            }
            .nav-mobile {
              justify-content: center !important;
              margin-top: 1rem;
            }
          }
          @media (max-width: 768px) {
            .header-container {
              padding: 10px !important;
            }
            .brand-text {
              font-size: 1.25rem !important;
            }
            .nav-links {
              gap: 15px !important;
            }
            .nav-link {
              font-size: 1rem !important;
            }
          }
          @media (max-width: 480px) {
            .header-flex {
              flex-direction: column !important;
              align-items: center !important;
            }
            .nav-links {
              margin-top: 10px !important;
            }
            .logo-icon {
              width: 35px !important;
              height: 35px !important;
            }
          }
        `}
      </style>
      <header className="header-bg">
        <div className="container-fluid">
          <div className="row py-3 px-3">
            <div className="col-12">
              <div className="d-flex flex-md-row header-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-center mb-0 mb-md-0">
                  <div className="logo-icon me-3">
                    <img src="/logo_svg.svg" alt="#" />
                  </div>
                  <h1 className="brand-text mb-0">MyVibe</h1>
                </div>
                <nav className="d-flex gap-4 nav-mobile">
                  {!isAuthorized ? (
                    <>
                      <button
                        className="nav-link-custom btn btn-link p-0"
                        style={{ background: 'none', border: 'none' }}
                        onClick={onRegisterClick}
                      >
                        Регистрация
                      </button>
                      <button
                        className="nav-link-custom btn btn-link p-0"
                        style={{ background: 'none', border: 'none' }}
                        onClick={onLoginClick}
                      >
                        Авторизация
                      </button>
                    </>
                  ) : (
                    <button
                      className="nav-link-custom btn btn-link p-0"
                      style={{ background: 'none', border: 'none' }}
                      onClick={onProfileClick}
                    >
                      Профиль
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;