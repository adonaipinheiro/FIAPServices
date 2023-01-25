const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Global Middlewares
const duration = require('./middlewares/durationMiddleware');

// Routes
const products = require('./modules/products');
const auth = require('./modules/auth');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
app.use('*', duration);

app.use('/auth', auth);
app.use('/products', products);

app.use('*', function (_, res) {
  res.status(404).send('Invalid route');
});

module.exports = app;
