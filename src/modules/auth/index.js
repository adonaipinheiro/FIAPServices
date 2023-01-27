const express = require('express');
const crypto = require('crypto');
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

  const bodyPass = crypto
    .createHash('sha256')
    .update(req.body.pass)
    .digest('hex');

  if (!user || user.pass !== bodyPass) {
    return res.status(404).json({
      message: 'Usuário ou senha não encontrados',
    });
  }

  const token = jwt.sign({email: req.body.email}, bodyPass, {
    expiresIn: '1d',
  });

  return res.json({
    token,
  });
});

router.put('/signUp', function (req, res) {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.pass ||
    !req.body.name === '' ||
    !req.body.email === '' ||
    !req.body.pass === ''
  )
    return res.status(403).json({
      message: 'Formato inválido',
    });

  const user = database.findUser(req.body.email);

  if (user) {
    return res.status(403).json({
      message: 'Usuário já cadastrado',
    });
  }

  const bodyPass = crypto
    .createHash('sha256')
    .update(req.body.pass)
    .digest('hex');

  database.addUser(req.body.name, req.body.email, bodyPass);

  const token = jwt.sign({email: req.body.email}, bodyPass, {
    expiresIn: '1d',
  });

  return res.json({
    token,
  });
});

router.get('/getAllUsers', function (_, res) {
  return res.status(200).json(database.getUsers());
});

router.get('/getAllUsers/withPass', function (_, res) {
  return res.status(200).json(database.getUsersWithPass());
});

router.get('/validateToken', authenticateToken, function (req, res) {
  return res.status(204).send();
});

module.exports = router;
