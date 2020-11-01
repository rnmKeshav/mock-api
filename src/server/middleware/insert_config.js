const insertConfig = function (config) {
  return function (req, res, next) {

    req.app.locals.config = config || {};

    next();
  }
}

module.exports = insertConfig;
