const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();

const database = require('../../database');

// Middleware
const authenticateToken = require('../../middlewares/authenticateTokenMiddleware');

router.post('/signIn', function (req, res) {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'LogIn do usuário'
  // #swagger.description = 'EndPoint para autenticar o usuário na aplicação e devolver um token válido'
  // #swagger.consumes = ['application/json']
  // #swagger.produces = ['application/json']

  /*	#swagger.requestBody = {
    required: true,
    schema: { $ref: "#/definitions/signInScheme" }
  } */

  const user = database.findUser(req.body.email);

  if (!req.body.email || !req.body.pass)
    /* #swagger.responses[403] = {
      schema: {
        message: 'Formato inválido'
      }
    } */
    return res.status(403).json({
      message: 'Formato inválido',
    });

  const bodyPass = crypto
    .createHash('sha256')
    .update(req.body.pass)
    .digest('hex');

  if (!user || user.pass !== bodyPass) {
    /* #swagger.responses[404] = {
      schema: {
        message: 'Usuário ou senha não encontrados'
      }
    } */
    return res.status(404).json({
      message: 'Usuário ou senha não encontrados',
    });
  }

  const token = jwt.sign({email: req.body.email}, bodyPass, {
    expiresIn: '1d',
  });

  /* #swagger.responses[200] = {
    schema: {
      token: 'Token JWT'
    }
  } */
  return res.json({
    token,
  });
});

router.put('/signUp', function (req, res) {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Cadastro do usuário'
  // #swagger.description = 'EndPoint para cadastrar o usuário na aplicação e devolver um token válido'
  // #swagger.consumes = ['application/json']
  // #swagger.produces = ['application/json']

  /*	#swagger.requestBody = {
    required: true,
    schema: { $ref: "#/definitions/signUpScheme" }
  } */

  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.pass ||
    !req.body.name === '' ||
    !req.body.email === '' ||
    !req.body.pass === ''
  )
    /* #swagger.responses[403] = {
      schema: {
        message: 'Formato inválido'
      }
    } */
    return res.status(403).json({
      message: 'Formato inválido',
    });

  const user = database.findUser(req.body.email);

  /* #swagger.responses[409] = {
      schema: {
        message: 'Usuário ou senha não encontrados'
      }
    } */
  if (user) {
    return res.status(409).json({
      message: 'Usuário já cadastrado',
    });
  }

  const bodyPass = crypto
    .createHash('sha256')
    .update(req.body.pass)
    .digest('hex');

  database.addUser(req.body.name, req.body.email, req.body.pass);

  const token = jwt.sign({email: req.body.email}, bodyPass, {
    expiresIn: '1d',
  });

  /* #swagger.responses[200] = {
    schema: {
      token: 'Token JWT'
    }
  } */
  return res.json({
    token,
  });
});

router.get('/getUser', function (req, res) {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Ler os dados do usuário logado'
  // #swagger.description = 'EndPoint para ler os dados do usuário logado na aplicação'
  // #swagger.produces = ['application/json']

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const userTokenDecoded = jwt.decode(token);

  /* #swagger.responses[401] = {
      schema: {
        message: 'Token inválido'
      }
  } */
  if (!userTokenDecoded) return res.sendStatus(401);

  const user = database.findUser(userTokenDecoded.email);

  /* #swagger.responses[403] = {
      schema: {
        message: 'Usuário não encontrado'
      }
  } */
  if (!user) return res.sendStatus(403);

  /* #swagger.responses[200] = {
    schema: {
      name: "Teste",
      email: "teste@teste.com.br"
    }
  } */
  return res.status(200).json({
    name: user.name,
    email: user.email,
  });
});

router.get('/getAllUsers', function (_, res) {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Ler todos os usuários cadastrados'
  // #swagger.description = 'EndPoint para ler todos os usuários cadastrados na aplicação'
  // #swagger.produces = ['application/json']

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/allUsersScheme" }
  } */
  return res.status(200).json(database.getUsers());
});

router.get('/getAllUsers/withPass', function (_, res) {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Ler todos os usuários cadastrados com suas senhas'
  // #swagger.description = 'EndPoint para ler todos os usuários cadastrados na aplicação'
  // #swagger.produces = ['application/json']

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/allUsersWithPassScheme" }
  } */
  return res.status(200).json(database.getUsersWithPass());
});

router.get('/validateToken', authenticateToken, function (_, res) {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Verificar se um token é válido'
  // #swagger.description = 'EndPoint para verificar se um token é válido'

  /* #swagger.responses[204] = {} */
  return res.status(204).send();
});

module.exports = router;
