const jwt = require('jsonwebtoken');
const database = require('../database');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) return res.sendStatus(401);

  const userTokenDecoded = jwt.decode(token);

  if (!userTokenDecoded) return res.sendStatus(401);

  const userPass = database.findUser(userTokenDecoded.email)?.pass;

  if (!userPass) return res.sendStatus(403);

  jwt.verify(token, userPass, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = authenticateToken;
