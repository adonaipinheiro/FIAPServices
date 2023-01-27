const {setTimeout} = require('timers/promises');

async function timeoutMiddleware(_, _, next) {
  await setTimeout(Math.floor(Math.random() * 500));

  next();
}

module.exports = timeoutMiddleware;
