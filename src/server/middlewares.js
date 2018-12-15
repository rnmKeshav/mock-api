const callRouteAction = route => (req, res, next) => {
  let { params, body } = req;

  let payload = {
    params,
    data: body
  };

  if (route.action) {
    route.action(payload);
  }

  next();
};

module.exports = {
  callRouteAction
};
