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
      payload: routePayload
    }
  } = route;
  let { body: requestBody, originalUrl } = req;

  configForwardMode = configForwardMode.toLowerCase();
  
  if (configForwardMode == "all" || (routeForwardEnabled && configForwardMode == "custom")) {
    let reqPayload = {
      payload:(requestBody || routePayload),
      headers: !isEmpty(routeForwardHeaders) ? routeForwardHeaders : configForwardHeaders
    };

    let hostname = !isEmpty(routeForwardHostname) ? routeForwardHostname : configForwardHostname;
    apiUtil(method, originalUrl, reqPayload, hostname)
      .then(response => {
        console.log("*************** success response ***************");
        console.log("forwarded path", hostname + originalUrl);
        console.log("response body", response);

        res.locals.customResponse = response;
        next();
      })
      .catch(err => {
        console.log("************* error has occurred **********************");
        console.log("forwarded path", hostname + originalUrl);
        console.log("request payload", JSON.stringify(reqPayload));
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
