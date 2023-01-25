const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const database = require('../../database');

// Middleware
const authenticateToken = require('../../middlewares/authenticateTokenMiddleware');

router.get('/signIn', function (req, res) {
  const user = database.findUser(req.body.email);

  if (!req.body.email || !req.body.pass)
    return res.status(403).json({
      message: 'Formato inválido',
    });
  if (!user || user.pass !== req.body.pass) {
    return res.status(404).json({
      message: 'Usuário ou senha não encontrados',
    });
  }

  const token = jwt.sign({email: req.body.email}, req.body.pass, {
    expiresIn: '1d',
  });

  return res.json({
    token,
  });
});

router.get('/getAllUsers', function (_, res) {
  return res.status(200).json(database.getUsers());
});

router.get('/validateToken', authenticateToken, function (req, res) {
  return res.status(204).send();
});

module.exports = router;
