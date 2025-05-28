import React from 'react';

const GameCard = ({ 
  gameName = "DOTA2", 
  gameIcon = "D", 
  description = "Игровой процесс Dota 2 является игрой в жанре Multiplayer Online Battle Arena (MOBA) («многопользовательская онлайн боевая арена»), это комбинация стратегии в реальном времени (RTS) и компьютерной ролевой игры (RPG). Игроки делятся на 2 команды «Силы света» и «Силы тьмы», каждая из которых состоит из 5 игроков.",
  onApply = () => console.log('Заявка отправлена')
}) => {
  return (
    <div 
      className="p-4"
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        maxWidth: '500px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Верхняя фиолетовая линия */}
      <div 
        style={{
          height: '4px',
          backgroundColor: '#8a2be2',
          marginBottom: '25px'
        }}
      ></div>

      {/* Заголовок с иконкой - НАЗВАНИЕ СЛЕВА ОТ ЛОГОТИПА */}
      <div className="d-flex align-items-center mb-4">
        <div 
          className="d-flex align-items-center justify-content-center"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#cc3333',
            border: '3px solid #ffffff',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            flexShrink: 0,
            marginRight: '20px'
          }}
        >
          {gameIcon}
        </div>
        <h2 className="text-white mb-0" style={{fontSize: '2rem', fontWeight: 'bold'}}>
          {gameName}
        </h2>
      </div>

      {/* Описание */}
      <p 
        className="text-white mb-4"
        style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}
      >
        {description}
      </p>

      {/* Кнопка по центру 80% ширины */}
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <button
          style={{
            backgroundColor: '#8a2be2',
            border: 'none',
            padding: '15px 20px',
            fontSize: '1.2rem',
            color: '#000000',
            fontWeight: 'bold',
            width: '80%',
            cursor: 'pointer'
          }}
          onClick={onApply}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#9932cc';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#8a2be2';
          }}
        >
          Снять заявку
        </button>
      </div>
    </div>
  );
};

export default GameCard;