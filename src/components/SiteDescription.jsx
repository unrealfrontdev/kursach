import React from 'react';
import PopularGames from './popular-games-grid.jsx';

const SiteDescription = ({ onOpenGames }) => {
    return (
      <>
        <style>
          {`
            .site-description {
                color: #ffffff;
                max-width: 440px;
                position: relative;
                z-index: 1;
            }
            @media (max-width: 600px) {
                .site-description {
                    max-width: 98vw;
                    padding: 10px !important;
                    min-height: 320px !important;
                }
                .description-text h2,
                .description-text .open-games-btn {
                    font-size: 1.5rem !important;
                    white-space: normal !important;
                }
                .description-text .lead {
                    font-size: 1rem !important;
                }
                .list-unstyled li {
                    font-size: 0.95rem !important;
                }
            }
            .site-description::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
                background-image: url('/logo_svg.svg');
                background-repeat: no-repeat;
                background-position: center;
                background-size: 80%;
                opacity: 0.4;
                z-index: -1;
            }
            .description-text {
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            }
            .description-text h2, .description-text .open-games-btn {
                font-size: 2.5rem;
                font-weight: bold;
                background: none;
                border: none;
                color: #fff;
                cursor: pointer;
                padding: 0;
                margin-bottom: 1rem;
                text-align: left;
                transition: color 0.2s;
                background: linear-gradient(90deg, #8a2be2, #fff, #8a2be2, #fff, #8a2be2);
                background-size: 200% auto;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shimmer 10s linear infinite;
                white-space: nowrap;
            }
            @keyframes shimmer {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }
            .description-text .open-games-btn:hover {
                color: #8a2be2;
                text-decoration: underline;
                -webkit-text-fill-color: #8a2be2;
                background: none;
                animation: none;
            }
            .description-text .lead {
                font-size: 1.2rem;
                line-height: 1.6;
            }
            .list-unstyled li {
                font-size: 1.1rem;
                padding-left: 10px;
            }
          `}
        </style>
        <div className="site-description p-4" style={{ position: 'relative', minHeight: '400px' }}>
          <div className="description-text">
            <button
              className="open-games-btn"
              onClick={onOpenGames}
              aria-label="Показать популярные игры"
            >
              Найди своих союзников
            </button>
            <p className="lead mb-4">
              MyVibe - это платформа, где геймеры находят единомышленников 
              для совместной игры. Создавай команду, общайся и побеждай вместе!
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">✓ Быстрый поиск напарников</li>
              <li className="mb-2">✓ Удобный подбор по играм и стилю игры</li>
              <li className="mb-2">✓ Создание и управление командами</li>
              <li className="mb-2">✓ Система рейтинга и отзывов</li>
            </ul>
          </div>
        </div>
      </>
    );
};

export default SiteDescription;