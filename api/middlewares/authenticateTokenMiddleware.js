const jwt = require('jsonwebtoken');
const database = require('../database');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  const userTokenDecoded = jwt.decode(token);

  /* #swagger.responses[401] = {
      schema: {
        message: 'Token inválido'
      }
  } */
  if (!userTokenDecoded) return res.sendStatus(401);

  const userPass = database.findUser(userTokenDecoded.email)?.pass;

  /* #swagger.responses[403] = {
      schema: {
        message: 'Token inválido'
      }
  } */
  if (!userPass) return res.sendStatus(403);

  jwt.verify(token, userPass, (err, user) => {
    /* #swagger.responses[403] = {
      schema: {
        message: 'Token inválido'
      }
  } */
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
