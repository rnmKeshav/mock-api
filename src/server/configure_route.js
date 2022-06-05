let _isEmpty = require("lodash.isempty");

let forwardAll = require("./middleware/forward_all");
let insertConfig = require("./middleware/insert_config");
let handleCustomRoute = require("./middleware/handle_custom_route");

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
        
        if (!_isEmpty(res.locals.error_data)) {
          
          let { status, text } = res.locals.error_data;
  
          if (status) {
            res.status(status);
          }
  
          res.send(text);
        } else {
  
          let { status: custom_status, headers: custom_headers } = response;
          if (custom_status) {
            res.status(custom_status)
          }
  
          if (custom_headers) {
            res.set(custom_headers);
          }
  
          res.send(response.response_data || res.locals.response_data)
        }
      })
    })
  }


  // Fallback to support forwarding all other route 
  if (config) {
    app.all("*", insertConfig(config), forwardAll, function (req, res) {
      if (!_isEmpty(res.locals.error_data)) {
        let { status, text } = res.locals.error_data;
  
        if (status) {
          res.status(status);
        }
        res.send(text);
      } else {
  
        res.send(res.locals.response_data)
      }
    });
  }
}

module.exports = configureRoute;
