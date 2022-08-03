let _isEmpty = require("lodash.isempty");

let forwardAll = require("./middleware/forward_all");
let insertConfig = require("./middleware/insert_config");
let handleCustomRoute = require("./middleware/handle_custom_route");

const handleResponse = (res, route_response = {}) => {
  if (!_isEmpty(res.locals.error_data)) {
          
    let { status, text } = res.locals.error_data;
    
    if (status) {
      res.status(status);
    }

    res.send(text);
  } else {

    let { status: custom_status, headers: custom_headers } = route_response;
    let {
      status: api_server_status, 
      body: api_server_response_nody,
      header: api_server_header
    } = res.locals.response_data;
    // console.log("res.locals.response_data", res.locals.response_data);
    if (custom_status) {
      res.status(custom_status)
    } else {
      res.status(api_server_status);
    }

    if (custom_headers) {
      res.set(custom_headers);
    } else {
      res.set(api_server_header)
    }
    // console.log("route_response.response_data", route_response.response_data);
    // console.log("api_server_response_nody", api_server_response_nody);

    // console.log("route_response.response_data || api_server_response_nody", route_response.response_data || api_server_response_nody);
    let response_data = _isEmpty(route_response.response_data) ? api_server_response_nody: oute_response.response_data;
    res.send(response_data)
    // return (route_response.response_data || api_server_response_nody);
  }
}

//This is an impure function. It modifies app to add routes.
const configureRoute = (config, app) => {

  // Configuration for custom route
  if (config && config.routes) {
    config.routes.forEach(function (route) {
      let { request = {}, response = {} } = route;
      let { path, method } = request;
      method = (method || "get").toLowerCase();
  
      if (!path) {
        return;
      }
  
      app[method](`${path}`, insertConfig(config), handleCustomRoute(route), function (req, res) {
        handleResponse(res, response);
      })
    })
  }


  // Fallback to support forwarding all other route 
  if (config) {
    app.all("*", insertConfig(config), forwardAll, function (req, res) {
      handleResponse(res);
    });
  }
}

module.exports = configureRoute;
