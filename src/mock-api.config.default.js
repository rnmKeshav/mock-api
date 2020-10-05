let config = {
  port: 3002,
  forward: {
    hostname: "https://jsonplaceholder.typicode.com/",  // hostname where request will be forwarded. This will be fallback for custom route.
    headers: {  // headers to be sent in all requests.
      cookie: "Hello=world;sdn=1", // cookie you would like to send as header when making request to your server(mentioned in hostname)
      host: "jsonplaceholder.typicode.com",
      accept: "application/json",
      referer: "https://jsonplaceholder.typicode.com/",
      "accept-encoding": "gzip"
    }
  },
  routes: [{  // custom routes if you want to modify request payload or response data. This can also be used to override request/response default data(headers/status) mentioned above in config.forward
    enable_forward: true, // true means request would be forwarded to routes.request.hostname if mentioned otherwise fallback to config.forward.hostname. false means api would be returning route.response.response_data
    request: {  // request object details. 
      path: "/search/users",  // route path for which this object will come into force.
      method: "GET",
      headers: {  // This will override config.forward.headers
        Host: "api.github.com"
      },
      hostname:"https://api.github.com/", // This will override config.forward.hostname
      payload: {},  // Payload to send to server for this API call
      beforeRequest: function () {
        // This gets called before network request
        // This method can change request object.
      }
    },
    response: {
      headers: {  // Can be used to override response header.
        "custom_response_header": "custom_response_header_value"
      },
      status: "", // Can be used to override response status code
      response_data: {},  // This is where response data is placed when API call succeeds.
      beforeResponse: function () {
        // This method gets called after network request
        // This method can change response object
      }
    }
  }]
}

module.exports = config;
