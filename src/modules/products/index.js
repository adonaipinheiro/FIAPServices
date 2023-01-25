const express = require('express');
const database = require('../../database');
const router = express.Router();

var products = [];

router.get('/', function (req, res) {
  database.addUser('adonai');
  console.log(database.getUsers());
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
