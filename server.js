/*
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

// Read credentials from environment variables
const username = process.env.BASIC_AUTH_USERNAME || 'admin';
const password = process.env.BASIC_AUTH_PASSWORD || 'supersecret';

// Basic Authentication middleware
app.use(basicAuth({
  users: { [username]: password },
  challenge: true,
  realm: 'Example App'
}));

// Serve a simple HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
*/


const express = require('express');
const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Read credentials from environment variables
const username = 'nnn';
const password = 'mmm';
const sessionId = 'NRP322111#*@'; // Hardcoded session ID

const authenticateUser = (req, res, next) => {
  const token = req.cookies.session_token;

  if (token === sessionId) {
    // User is already authenticated
    return next();
  }

  // Use basic auth to authenticate
  basicAuth({
    users: { [username]: password },
    challenge: true,
    realm: 'Be a Learning Machine.'
  })(req, res, () => {
    // Set session cookie upon successful authentication
    // When 'httpOnly' is set to 'true', it ensures that the cookie is only sent to the server with HTTP requests (such as GET or POST), and it cannot be accessed or modified using JavaScript running in the browser.
    res.cookie('session_token', sessionId, { maxAge: 60 * 1000, httpOnly: true });
    next();
  });
};

// Apply the authentication middleware
app.use(authenticateUser);

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
