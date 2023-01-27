const express = require('express');
const database = require('../../database');
const router = express.Router();

// Middleware
const authenticateToken = require('../../middlewares/authenticateTokenMiddleware');

router.use(authenticateToken);

router.get('/', function (req, res) {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Pegar todos os produtos do usuário'
  // #swagger.description = 'EndPoint para pegar todos os produtos do usuário'
  // #swagger.produces = ['application/json']

  /* #swagger.security = [{
     "bearerAuth": []
  }] */

  /* #swagger.responses[200] = {
    schema: { $ref: "#/definitions/productsScheme" }
  } */
  return res.status(200).json({
    products: database.getUserProducts(req.user.email),
  });
});

router.put('/', function (req, res) {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Adicionar um produtos no usuário'
  // #swagger.description = 'EndPoint para adicionar um produtos no usuário'
  // #swagger.consumes = ['application/json']
  // #swagger.produces = ['application/json']

  /* #swagger.security = [{
     "bearerAuth": []
  }] */

  /*	#swagger.requestBody = {
    required: true,
    schema: { $ref: "#/definitions/addProductsScheme" }
  } */

  /* #swagger.responses[403] = {
    schema: { message: 'Formato inválido' }
  } */
  if (!req.body.product || req.body.product === '') res.send(403);

  database.addUserProduct(req.user.email, req.body.product);

  /* #swagger.responses[200] = {
    schema: {message: 'Produto adicionado com sucesso!'}
  } */
  return res
    .status(200)
    .json({message: 'Produto adicionado com sucesso!'});
});

router.delete('/', function (req, res) {
  // #swagger.tags = ['Products']
  // #swagger.summary = 'Remover um produtos no usuário'
  // #swagger.description = 'EndPoint para remover um produtos no usuário'
  // #swagger.consumes = ['application/json']
  // #swagger.produces = ['application/json']

  /* #swagger.security = [{
     "bearerAuth": []
  }] */

  /*	#swagger.requestBody = {
    required: true,
    schema: { $ref: "#/definitions/addProductsScheme" }
  } */

  /* #swagger.responses[403] = {
    schema: { message: 'Formato inválido' }
  } */
  if (!req.body.product || req.body.product === '') res.send(403);

  const removeItem = database.removeUserProduct(
    req.user.email,
    req.body.product,
  );

  if (removeItem < 0)
    return res.status(400).json({message: 'Produto não existe'});

  /* #swagger.responses[200] = {
    schema: {message: 'Produto removido com sucesso!'}
  } */
  return res
    .status(200)
    .json({message: 'Produto removido com sucesso!'});
});

module.exports = router;
