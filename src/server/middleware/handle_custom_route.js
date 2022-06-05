let networkCall = require("../network_call");

const handleCustomRoute = function (route) {
  return function (req, res, next) {
    let {enable_forward, request = {}, response = {}} = route;
    let {params, body} = req;

    if (request.beforeRequest) {
      request.beforeRequest();
    }

    // The callback function receives request's params and body. 
    if (!enable_forward) {
      if (response.beforeResponse) {
        response.beforeResponse({params, body});
      }
      next();
    } else {
      let {app: {locals: {config}}, method, headers: req_headers, query: req_query} = req;
      let {hostname: config_hostname, headers: config_headers} = config.forward;
      let {path, hostname = config_hostname, headers: custom_headers, payload: custom_payload, query: custom_query} = request;
      let headers = Object.assign({}, req_headers, config_headers, custom_headers);
      let query = Object.assign({}, req_query, custom_query);
      let payload = Object.assign({}, body, custom_payload);

      if (headers.skip_req_headers && headers.skip_forward_all_headers) {
        headers = Object.assign({}, custom_headers);
        delete headers.skip_req_headers;
      } else if (headers.skip_req_headers) {
        headers = Object.assign({}, config_headers, custom_headers);
        delete headers.skip_req_headers;
      } else if (headers.skip_forward_all_headers) {
        headers = Object.assign({}, req_headers, custom_headers);
        delete headers.skip_forward_all_headers;
      }
      
      networkCall({pathname: path, method, headers, hostname, query, payload})
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
          // The callback function receives request's params and body. 
          if (response.beforeResponse) {
            response.beforeResponse({params, body});
          }
          next();
        })
    }
  }
  
} 

module.exports = handleCustomRoute;
