const express = require('express');
const jwt = require('jsonwebtoken');
const database = require('../../database');
const router = express.Router();

// Middleware
const authenticateToken = require('../../middlewares/authenticateTokenMiddleware');

router.get('/signIn', function (req, res) {
  database.addUser('adonai');
  console.log(database.getUsers());
  const token = jwt.sign({email: 'adonai'}, 'adonai', {
    expiresIn: '1d',
  });
  res.json({
    token,
    // users: db.getUsers(),
  });
});

router.get('/validateToken', authenticateToken, function (req, res) {
  res.status(200).json({message: 'Token válido'});
});

module.exports = router;
