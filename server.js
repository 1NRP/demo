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
