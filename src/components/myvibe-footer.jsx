import React from 'react';

const Footer = () => {
  return (
    <>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <style>
        {`
          .footer-bg {
            border-top: 3px solid #6A00A7;
            width: 100vw;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 100;
          }
          .footer-content {
            background-color: #000000;
            padding: 12px 0;
          }
          .footer-text {
            color: #ffffff;
            font-size: 1.125rem;
            font-weight: 500;
            margin: 0;
          }
          .phone-link {
            color: #ffffff;
            text-decoration: none;
            font-size: 1.125rem;
            font-weight: 500;
            transition: opacity 0.2s ease;
          }
          .phone-link:hover {
            color: #ffffff;
            opacity: 0.8;
            text-decoration: none;
          }
        `}
      </style>
      <footer className="footer-bg">
        <div className="footer-content">
          <div className="container-fluid">
            <div className="row align-items-center px-3">
              <div className="col-auto">
                <p className="footer-text">Связаться с нами</p>
              </div>
              <div className="col">
                <div className="d-flex justify-content-end">
                  <a href="tel:+79999999999" className="phone-link">
                    +7 999 999 99 99
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;