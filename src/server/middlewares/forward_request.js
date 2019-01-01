let apiUtil = require("../api_util");
let { isEmpty } = require("../utilities");

const forwardRequest = config => route => (req, res, next) => {
  let {
    forward: {
      enabled: configForwardEnabled,
      mode: configForwardMode,
      hostname: configForwardHostname,
      headers: configForwardHeaders
    } = {}
  } = config;
  let {
    request: {
      forward: {
        enabled: routeForwardEnabled,
        hostname: routeForwardHostname,
        headers: routeForwardHeaders
      } = {},
      path,
      method,
      payload
    }
  } = route;
  let { query } = req;
  configForwardMode = configForwardMode.toLowerCase();
  
  if (configForwardMode == "all" || (routeForwardEnabled && configForwardMode == "custom")) {
    let reqPayload = {
      payload,
      query,
      headers: !isEmpty(routeForwardHeaders) ? routeForwardHeaders : configForwardHeaders
    };

    //console.log("reqPayload", reqPayload);

    let hostname = !isEmpty(routeForwardHostname) ? routeForwardHostname : configForwardHostname;
    apiUtil(method, path, reqPayload, hostname)
      .then(response => {
        console.log("*************** success response ***************");
        console.log("forwarded path", hostname + path);
        console.log("response body", response);

        res.locals.customResponse = response;
        next();
      })
      .catch(err => {
        console.log("************* error has occurred **********************");
        console.log("forwarded path", hostname + path);
        console.log("status code", err.status);
        console.log("error response body", err.response.body);

        res.locals.customResponse = err.response.body;
        res.locals.headers = { status: err.status };

        next();
      });
  } else {
    next();
  }
};

module.exports = forwardRequest;
