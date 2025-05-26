import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Authorization = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#1c2526' }}>
      <div className="card p-4" style={{ width: '400px', backgroundColor: '#2a2a2a', border: '2px solid #6f42c1', color: '#fff' }}>
        <h2 className="text-center mb-4">Регистрация</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Имя пользователя</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Введите имя пользователя"
            style={{ backgroundColor: '#2a2a2a', color: '#fff', borderColor: '#6f42c1' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telegram" className="form-label">Ссылка на Telegram</label>
          <input
            type="text"
            className="form-control"
            id="telegram"
            placeholder="Введите ссылку на Telegram"
            style={{ backgroundColor: '#2a2a2a', color: '#fff', borderColor: '#6f42c1' }}
          />
        </div>
        <button
          className="btn w-100"
          style={{ backgroundColor: '#6f42c1', color: '#fff', border: 'none' }}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Authorization;