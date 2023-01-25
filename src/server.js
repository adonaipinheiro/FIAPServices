const express = require('express');
const {app} = require('./app');
const server = express();

const PORT = 3000;

server.use(app);

server.listen(PORT, () => {
  console.log(
    `\nRunning on port: ${PORT} 🚀\nLink: http://localhost:${PORT}`,
  );
});
