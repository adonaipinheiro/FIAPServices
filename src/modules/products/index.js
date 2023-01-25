const express = require('express');
const database = require('../../database');
const router = express.Router();

// Middleware
const authenticateToken = require('../../middlewares/authenticateTokenMiddleware');

router.use(authenticateToken);

router.get('/', function (req, res) {
  return res.status(200).json({
    products: database.getUserProducts(req.user.email),
  });
});

router.put('/', function (req, res) {
  if (!req.body.product || req.body.product === '') res.send(403);

  database.addUserProduct(req.user.email, req.body.product);

  return res
    .status(200)
    .json({message: 'Produto adicionado com sucesso!'});
});

router.delete('/', function (req, res) {
  if (!req.body.product || req.body.product === '') res.send(403);

  const removeItem = database.removeUserProduct(
    req.user.email,
    req.body.product,
  );

  if (removeItem < 0)
    return res.status(400).json({message: 'Produto não existe'});

  return res
    .status(200)
    .json({message: 'Produto removido com sucesso!'});
});

module.exports = router;
