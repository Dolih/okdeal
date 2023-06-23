const express = require('express');
const session = require('express-session');
const pgp = require('pg-promise')();
const bcrypt = require('bcrypt');

const app = express();

// Настройка средства хранения сессий (в данном случае, используется сессии в памяти)
app.use(session({
  secret: 'mysecretkey', // Секретный ключ для подписания сессии
  resave: false, // Не сохранять сессию на сервере при каждом запросе
  saveUninitialized: false // Не сохранять пустые сессии на сервере
}));

// Настройка парсера для обработки данных из POST-запросов
app.use(express.urlencoded({ extended: true }));

// Настройка подключения к базе данных
const db = pgp('postgres://LyamovOK:Brisingr@localhost:5432/users');

// Функция аутентификации пользователя
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      
      if (result) {
        req.session.user = user;
        console.log('Пользователь аутентифицирован:', user);
        res.send('Вы успешно вошли в систему!');
      } else {
        console.log('Неверный пароль');
        res.send('Неверный пароль. Попробуйте еще раз.');
      }
    } else {
      console.log('Пользователь не найден');
      res.send('Пользователь не найден. Попробуйте еще раз.');
    }
  } catch (error) {
    console.error('Ошибка при авторизации пользователя:', error);
    // Отправляем ответ клиенту
    res.send('Произошла ошибка при авторизации. Попробуйте еще раз.');
  }
};
// Обработчик POST-запроса на страницу логина
app.post('/login', loginUser);

// Обработчик GET-запроса на страницу профиля пользователя
app.get('/profile', (req, res) => {
  // Проверяем, есть ли пользователь в сессии
  if (req.session.user) {
    // Если пользователь авторизован, отображаем его профиль
    console.log('Пользователь авторизован:', req.session.user);
    // Отправляем ответ клиенту с данными профиля
    res.send(`Добро пожаловать, ${req.session.user.username}! Ваш email: ${req.session.user.email}`);
  } else {
    // Если пользователь не авторизован, перенаправляем на страницу логина
    console.log('Пользователь не авторизован');
    // Отправляем ответ клиенту с перенаправлением на страницу логина
    res.redirect('/login');
  }
});

// Обработчик GET-запроса на страницу выхода из профиля
app.get('/logout', (req, res) => {
  // Удаляем пользователя из сессии
  req.session.user = null;
  // Отправляем ответ клиенту с перенаправлением на страницу логина
  res.redirect('/login');
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});