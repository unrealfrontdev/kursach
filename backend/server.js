const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3001;

// Подключение CORS и парсинг JSON
app.use(cors());
app.use(express.json());

// Создание/открытие базы данных
const db = new sqlite3.Database(path.resolve(__dirname, 'users.db'), (err) => {
  if (err) {
    console.error('Ошибка подключения к базе:', err.message);
  } else {
    console.log('База данных подключена');
  }
});

// Создание таблицы, если не существует
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    telegram TEXT NOT NULL
  )
`);

// Эндпоинт для регистрации
app.post('/register', (req, res) => {
  const { username, telegram } = req.body;
  if (!username || !telegram) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }
  db.run(
    'INSERT INTO users (username, telegram) VALUES (?, ?)',
    [username, telegram],
    function (err) {
      if (err) {
        console.error('Ошибка при добавлении пользователя:', err);
        return res.status(500).json({ error: 'Ошибка базы данных' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// Эндпоинт для авторизации
app.post('/login', (req, res) => {
  const { username, telegram } = req.body;
  if (!username || !telegram) {
    return res.status(400).json({ error: 'Все поля обязательны' });
  }
  db.get(
    'SELECT * FROM users WHERE username = ? AND telegram = ?',
    [username, telegram],
    (err, row) => {
      if (err) {
        console.error('Ошибка при поиске пользователя:', err);
        return res.status(500).json({ error: 'Ошибка базы данных' });
      }
      if (row) {
        res.json({ success: true, user: row });
      } else {
        res.json({ success: false, error: 'Пользователь не найден' });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});