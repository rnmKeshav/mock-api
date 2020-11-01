const callRouteAction = route => (req, res, next) => {
  let { params, body, query } = req;

  let payload = {
    params,
    data: body,
    query
  };

  if (route.action) {
    route.action(payload);
  }

  next();
};

module.exports = callRouteAction;
