import React from 'react';

const GameBanner = () => {
  const handlePlayClick = () => {
    console.log('Игра начинается!');
    // Здесь можно добавить логику для начала игры
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-black text-white flex items-center justify-between p-6 shadow-lg border-t-4 border-purple-600">
        {/* Левая часть с текстом */}
        <div className="flex-1">
          <h2 className="text-xl font-medium">
            Дима предлагает сыграть с вами
          </h2>
        </div>
        
        {/* Правая часть с кнопкой */}
        <div>
          <button 
            onClick={handlePlayClick}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 text-lg tracking-wider transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            ИГРАТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBanner;