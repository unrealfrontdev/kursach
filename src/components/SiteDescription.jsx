import React from 'react';

const SiteDescription = () => {
    return (
      <>
        <style>
          {`
            .site-description {
                color: #ffffff;
                max-width: 600px;
                position: relative;
                z-index: 1;
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
                opacity: 0.4; /* Увеличил прозрачность с 0.1 до 0.2 */
                z-index: -1;
            }

            .description-text {
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            }

            .description-text h2 {
                font-size: 2.5rem;
                font-weight: bold;
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
        <div className="site-description p-4">
          <div className="description-text">
            <h2 className="mb-3">Найди своих союзников</h2>
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