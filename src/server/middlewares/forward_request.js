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
      method: route_method,
      payload: routePayload
    } = {}
  } = route;
  let { body: requestBody, originalUrl, method: req_method } = req;

  configForwardMode = configForwardMode.toLowerCase();
  
  if (configForwardMode == "all" || (routeForwardEnabled && configForwardMode == "custom") || ((typeof routeForwardEnabled==="undefined") && (configForwardMode == "custom"))) {
    let customHeaders = !isEmpty(routeForwardHeaders) ? routeForwardHeaders : configForwardHeaders;
    let headers = Object.assign({}, customHeaders);
    let reqPayload = {
      payload:(requestBody || routePayload),
      headers 
    };
    let method = route_method || req_method;
    
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
        console.error("************* error has occurred **********************");
        console.info("forwarded path", hostname + originalUrl);
        console.info("request payload", JSON.stringify(reqPayload));
        console.info("status code", err.status);
        console.info("error response body", err.response && err.response.body);
        console.error("err", err);

        res.locals.customResponse = err.response && err.response.body;
        res.locals.headers = { status: err.status };

        next();
      });
  } else {
    next();
  }
};

module.exports = forwardRequest;
