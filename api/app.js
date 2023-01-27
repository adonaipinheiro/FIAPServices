const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

// Routes
const products = require('./modules/products');
const auth = require('./modules/auth');

// Middlewares
const timeoutMiddleware = require('./middlewares/timeoutMiddleware');

app.use(timeoutMiddleware);

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options),
);

app.use(express.json());
app.use(cors());

app.use('/auth', auth);
app.use('/products', products);

app.use('*', function (_, res) {
  res.status(404).send('Invalid route');
});

module.exports = {
  app,
};
