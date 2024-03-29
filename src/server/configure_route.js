let _isEmpty = require("lodash.isempty");

let forwardAll = require("./middleware/forward_all");
let insertConfig = require("./middleware/insert_config");
let handleCustomRoute = require("./middleware/handle_custom_route");

const handleResponse = (res, route_response = {}, enable_forward) => {
  if (!_isEmpty(res.locals.error_data)) {
          
    let { status, text } = res.locals.error_data;
    
    if (status) {
      res.status(status);
    }

    res.send(text);
  } else {

    let { status: custom_status, headers: custom_headers, 
      response_data: custom_response_data } = route_response;
    let {
      status: api_server_status, 
      body: api_server_response_body,
      header: api_server_header
    } = res.locals.response_data || {};
    let status_to_send, headers_to_send = {}, response_data_to_send = {};

    // console.log("res.locals.response_data", res.locals.response_data);
    // console.log("api_server_status", api_server_status);

    if (enable_forward === false) {
      status_to_send = custom_status || 200;
      headers_to_send = custom_headers;
      response_data_to_send = custom_response_data;

    } else {
      status_to_send = api_server_status;
      headers_to_send = api_server_header;
      response_data_to_send = api_server_response_body;
    }

    res.status(status_to_send);
    res.set(headers_to_send);
    // console.log("route_response", route_response);
    // console.log("route_response.response_data", route_response.response_data);
    // console.log("api_server_response_body", api_server_response_body);

    // console.log("route_response.response_data || api_server_response_body", route_response.response_data || api_server_response_body);
    // let response_data = enable_forward ? api_server_response_body: route_response.response_data;
    res.send(response_data_to_send)
    // return (route_response.response_data || api_server_response_body);
  }
}

//This is an impure function. It modifies app to add routes.
const configureRoute = (config, app) => {

  // Configuration for custom route
  if (config && config.routes) {
    config.routes.forEach(function (route) {
      let { request = {}, response = {}, enable_forward } = route;
      let { path, method } = request;
      method = (method || "get").toLowerCase();
  
      if (!path) {
        return;
      }
  
      app[method](`${path}`, insertConfig(config), handleCustomRoute(route), function (req, res) {
        handleResponse(res, response, enable_forward);
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
