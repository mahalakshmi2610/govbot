const express = require('express');
const session = require('express-session');
const app = express();

// Session middleware setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Login route
app.post('/login', (req, res) => {
  // Check user credentials (e.g., in a database)
  // If credentials are valid, create a session
  req.session.user = { username: 'example_user' };
  res.json({ message: 'Login successful' });
});

// Logout route
app.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

// Session status route
app.get('/session', (req, res) => {
  // Check if a session exists
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
