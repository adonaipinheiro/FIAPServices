const express = require('express');
const router = express.Router();

var products = [];

router.get('/', function (req, res) {
  res.status(200).json({
    products,
  });
});

router.put('/', function (req, res) {
  products.push({
    name: 'teste',
  });

  res.status(200).json({message: 'Produto adicionado com sucesso!'});
});

module.exports = router;
