// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret_key1'; // Ensure this is the same as the one used to sign the token

module.exports = function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Log the token for debugging
  console.log('Authorization Header:', authHeader);
  console.log('Token:', token);

  if (!token) {
    console.log('Access token missing');
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid access token' });
    }

    // Log the decoded user for debugging
    console.log('Decoded User:', user);

    // Token is valid, attach the user to the request
    req.user = user;
    next();
  });
};