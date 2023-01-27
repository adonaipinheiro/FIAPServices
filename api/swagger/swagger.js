const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    title: 'FIAP Services',
    description: 'Para aulas de requisições HTTP',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    allUsersScheme: [
      {
        name: 'Vin',
        email: 'vin.maurise@outlook.com',
        products: ['Pera', 'Maça', 'Banana'],
      },
    ],
    allUsersWithPassScheme: [
      {
        name: 'Vin',
        email: 'vin.maurise@outlook.com',
        pass: 'JWT Token',
        products: ['Pera', 'Maça', 'Banana'],
      },
    ],
    productsScheme: ['Banana'],
    addProductsScheme: {
      product: 'Banana',
    },
    signInScheme: {
      email: 'admin@admin.com',
      pass: '123456',
    },
    signUpScheme: {
      name: 'Admin',
      email: 'admin@admin.com',
      pass: '123456',
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['../app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
