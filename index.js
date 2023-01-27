const express = require('express');
const {app} = require('./api/app.js');
const server = express();

const PORT = process.env.PORT || 3000;

server.use(app);

server.listen(PORT, () => {
  console.log(
    `\nRunning on port: ${PORT} 🚀\nLink: http://localhost:${PORT}`,
  );
});
