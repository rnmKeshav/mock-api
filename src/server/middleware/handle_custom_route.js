let networkCall = require("../network_call");

const handleCustomRoute = function (route) {
  return function (req, res, next) {
    let {enable_forward, request = {}, response = {}} = route;

    if (request.beforeRequest) {
      request.beforeRequest();
    }

    if (!enable_forward) {
      if (response.beforeResponse) {
        response.beforeResponse();
      }
      next();
    } else {
      let {app: {locals: {config}}, method, headers: req_headers, query: req_query} = req;
      let {hostname: config_hostname, headers: config_headers} = config;
      let {path, hostname = config_hostname, headers: custom_headers, payload, query: custom_query} = request;
      let headers = Object.assign({}, req_headers, config_headers, custom_headers);
      let query = Object.assign({}, req_query, custom_query);

      networkCall({url: path, method, headers, hostname, query, payload})
        .then(function (response_data) {
          
          response.response_data = response_data;
          Object.assign(res.locals, {
            response_data
          })
        }).catch(function (data){

          Object.assign(res.locals, {
            error_data: data
          })
        })
        .finally(function () {
          if (response.beforeResponse) {
            response.beforeResponse();
          }
          next();
        })
    }
  }
  
} 

module.exports = handleCustomRoute;
