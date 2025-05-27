import React, { useState } from 'react';

const Autorization = ({ setIsAuthorized }) => {
  const [username, setUsername] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!username || !telegramLink) {
      setMessage('Заполните все поля');
      return;
    }
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, telegram: telegramLink }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Вход выполнен успешно!');
        if (setIsAuthorized) setIsAuthorized({
          username,
          telegram: telegramLink
        }); // передаем объект пользователя
      } else {
        setMessage(data.error || 'Пользователь не найден');
      }
    } catch (err) {
      setMessage('Ошибка соединения с сервером');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ 
      backgroundColor: '#000',
      width: '100%',
      height: '100%'
    }}>
      <div className="card shadow-lg" style={{ 
        width: '90%',
        maxWidth: '600px',
        backgroundColor: '#000', 
        borderTop: '3px solid #6A00A7',
        borderBottom: '3px solid #6A00A7',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: '0',
        margin: '2rem 0'
      }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4" style={{ 
            color: '#fff', 
            fontSize: '2.5rem',
            fontWeight: 'normal',
            marginBottom: '2rem'
          }}>
            Авторизация
          </h2>

          <div>
            <div className="mb-4">
              <label htmlFor="username" className="form-label" style={{ 
                color: '#fff',
                fontSize: '1.1rem'
              }}>
                Имя пользователя
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #6A00A7',
                  borderRadius: '0',
                  color: '#fff',
                  fontSize: '1.2rem',
                  padding: '15px 0',
                  width: '100%'
                }}
                onFocus={(e) => e.target.style.outline = 'none'}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="telegram" className="form-label" style={{ 
                color: '#fff',
                fontSize: '1.1rem'
              }}>
                Ссылка на telegram
              </label>
              <input
                type="text"
                className="form-control"
                id="telegram"
                value={telegramLink}
                onChange={(e) => setTelegramLink(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #6A00A7',
                  borderRadius: '0',
                  color: '#fff',
                  fontSize: '1.2rem',
                  padding: '15px 0',
                  width: '100%'
                }}
                onFocus={(e) => e.target.style.outline = 'none'}
              />
            </div>

            <button
              type="button"
              className="btn w-100"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#6A00A7',
                border: 'none',
                color: '#fff',
                fontSize: '1.2rem',
                padding: '12px',
                borderRadius: '0',
                fontWeight: 'normal'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#7C3AED'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#8B5CF6'}
            >
              Войти
            </button>
            {message && (
              <div style={{ color: '#fff', marginTop: 10, textAlign: 'center' }}>{message}</div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-control:focus {
          box-shadow: none !important;
          border-top-color: #A855F7 !important;
        }
        
        .form-control::placeholder {
          color: #6A00A7;
        }
        
        .btn:focus {
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default Autorization;