const session = require('express-session');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    secure: true,               // true if using HTTPS
    httpOnly: true
  }
});

module.exports = sessionMiddleware;
