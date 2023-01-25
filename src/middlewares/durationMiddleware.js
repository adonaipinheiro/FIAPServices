const duration = function (req, res, next) {
  console.time(
    `\n\"${req.method} ${req.hostname}${req.baseUrl}${req.path}\"
    \nResponse time`,
  );
  res.on('finish', function () {
    console.timeEnd(
      `\n\"${req.method} ${req.hostname}${req.baseUrl}${req.path}\"
    \nResponse time`,
    );
  });
  next();
};

module.exports = duration;
