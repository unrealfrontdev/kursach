import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!username || !telegramLink) {
      setMessage('Заполните все поля');
      return;
    }

    // Проверка формата ссылки на телеграм
    if (!telegramLink.startsWith('@')) {
      setMessage('Ссылка на telegram должна начинаться с @');
      return;
    }

    const res = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, telegram: telegramLink }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Регистрация успешна!');
      setUsername('');
      setTelegramLink('');
    } else if (data.error === 'пользователь с таким ником уже существует') {
      setMessage('пользователь с таким ником уже существует');
    } else {
      setMessage(data.error || 'Ошибка регистрации');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ 
      backgroundColor: '#000',
      width: '50vh',
      height: '50vh'
    }}>
      <div className="card shadow-lg auth-card" style={{ 
        width: '100%',
        maxWidth: '950px',
        backgroundColor: '#000', 
        borderTop: '6px solid #6A00A7',
        borderBottom: '6px solid #6A00A7',
        borderLeft: 'none',
        borderRight: 'none',
        borderRadius: '0',
        margin: '5rem 0',
        boxShadow: '0 0 60px 20px #6A00A7',
        
      }}>
        <div className="card-body p-5" style={{ padding: '4rem' }}>
          <h2 className="text-center mb-4 auth-title" style={{ 
            color: '#fff', 
            fontSize: '2.2rem', // уменьшено
            fontWeight: 'normal', // убран bold
            marginBottom: '2rem'
          }}>
            Регистрация
          </h2>
          <div>
            <div className="mb-5">
              <label htmlFor="username" className="form-label" style={{ 
                color: '#fff',
                fontSize: '1.1rem' // уменьшено
              }}>
                Имя пользователя
              </label>
              <input
                type="text"
                className="form-control form-input"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #6A00A7',
                  borderRadius: '0',
                  color: '#fff',
                  fontSize: '1.2rem', // уменьшено
                  padding: '16px 0', // чуть меньше
                  width: '100%'
                }}
                onFocus={(e) => e.target.style.outline = 'none'}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="telegram" className="form-label" style={{ 
                color: '#fff',
                fontSize: '1.1rem' // уменьшено
              }}>
                Ссылка на telegram
              </label>
              <input
                type="text"
                className="form-control form-input"
                id="telegram"
                value={telegramLink}
                onChange={(e) => setTelegramLink(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid #6A00A7',
                  borderRadius: '0',
                  color: '#fff',
                  fontSize: '1.2rem', // уменьшено
                  padding: '16px 0', // чуть меньше
                  width: '100%'
                }}
                onFocus={(e) => e.target.style.outline = 'none'}
              />
            </div>
            <button
              type="button"
              className="btn w-100 submit-button"
              onClick={handleSubmit}
              style={{
                backgroundColor: '#6A00A7',
                border: 'none',
                color: '#fff',
                fontSize: '1.2rem', // уменьшено
                padding: '14px',
                borderRadius: '0',
                fontWeight: 'normal' // убран bold
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#7C3AED'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#8B5CF6'}
            >
              Зарегистрироваться
            </button>
            {message && (
              <div style={{ color: '#fff', marginTop: 20, textAlign: 'center', fontSize: '1.05rem' }}>{message}</div>
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
      <style>
{`
  @media (max-width: 768px) {
    .auth-card {
      width: 90% !important;
      margin: 1rem auto !important;
      padding: 1.5rem !important;
    }
    .auth-title {
      font-size: 1.75rem !important;
    }
    .form-input {
      font-size: 1rem !important;
    }
  }
  @media (max-width: 480px) {
    .auth-card {
      width: 95% !important;
      padding: 1rem !important;
    }
    .auth-title {
      font-size: 1.5rem !important;
    }
    .form-input {
      font-size: 0.9rem !important;
    }
    .submit-button {
      font-size: 1rem !important;
      padding: 10px !important;
    }
  }
`}
</style>
    </div>
  );
};

export default RegistrationForm;

