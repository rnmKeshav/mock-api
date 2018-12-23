/*
  Route object format 
  {
    request: { // Details regarding API request you are making
      path: "/path/to/your/request/api",
      method: "request method(get, post, delete, patch etc)"
      forward: {
        enabled: true/false,   // Whether this route should be forwarded when config's `forward.mode` is `custom`
        hostname: "http://forwardTo.url",
        headers: {}   // Override config's header values with this object for current route forwarding.
      }
    },
    response: { // Details regarding API response for requested path we want   
      data: {},  // Response data wanted when we make request to above path
      headers: {
        status: 201 // Response status,
        "X-API-TOKEN": "some_random_value"
      }
    },
    action: function({param, data}) { // A function which has access to current route object.
      //param: request parameters
      // data: payload data sent in request for post/patch
    }
  }
*/

const userData = require("./user_data");

const routes = [
  {
    request: {
      path: "/user",
      method: "GET"
    },
    response: {
      data: userData
    }
  },
  {
    request: {
      path: "/logged_in_user",
      method: "GET",
      forward: {
        enabled: true // This has effect only when config's forward.mode=custom.
      }
    }
  },
  {
    request: {
      path: "/search/users",
      method: "GET",
      forward: {
        enabled: true,
        hostname: "https://api.github.com" // This overrides hostname set in config for this route's request
      }
    }
  }
];

module.exports = routes;
