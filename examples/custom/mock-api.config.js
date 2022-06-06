function getAPIToken() {
  return {
    "X-API-TOKEN": "XXXXXXXX"
  };
}

let config = {
  port: 3002,
  forward: {
    hostname: "https://jsonplaceholder.typicode.com", // hostname where request will be forwarded. This will be fallback for custom route.
    headers: { // headers to be sent in all requests.
      cookie: "pelUUID=96d2cfa0-e0ce-4795-beb3-917c5c1dd79c; _ga=GA1.2.1683668930.1598687051; _gcl_au=1.1.1869798560.1598687054; _fbp=fb.1.1598706524131.962812492;hl=en; pelUUID=174edf11de59da-068985a51643be-5b7f7327-5294d-174edf11de690c; __cfruid=e14408ee99e3a9ae0b2b1bcdfe71dda5c137e3a4-1601719873; WZRK_G=9746059b128d44d1bc23bec757dfb5c3; _gat=1; _gat_fabric=1; WZRK_S_8W6-695-WK5Z=%7B%22p%22%3A9%2C%22s%22%3A1601719832%2C%22t%22%3A1601720622%7D; modal_login=true", // cookie you would like to send as header when making request to your server(mentioned in hostname)
      host: "jsonplaceholder.typicode.com",
      accept: "application/json",
      referer: "https://jsonplaceholder.typicode.com/",
      "accept-encoding": "gzip"
    }
  },
  routes: [{  // custom routes if you want to modify request payload or response data. This can also be used to override request/response default data(headers/status) mentioned above in `config.forward`
    enable_forward: true, // true means request would be forwarded to routes.request.hostname if mentioned otherwise fallback to config.forward.hostname. false means api would be returning route.response.response_data
    request: {  // request object details. 
      path: "/search/users",  // route path for which this object will come into force.
      method: "GET",
      headers: {  // This will override config.forward.headers
        Host: "api.github.com"
      },
      hostname:"https://api.github.com/",
      query: {
        q: "rnmkeshav"
      },
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
  }, {  // To see this in action, make a POST request to `http://localhost:3002/api/users` with {"name":"morpheus","job":"leader"} as request payload 
    enable_forward: true, 
    request: {
      path: "/api/users",
      method: "POST",
      hostname: "https://reqres.in/",
      payload: {},
      headers: {
        skip_req_headers: true, //headers which gets sent automatically from client/browser
        skip_forward_all_headers: true, //headers which gets sent in forward all request. `config.forward.headers`
        // host: "https://reqres.in",
        accept: "application/json",
        // referer: "https://reqres.in/",
        // "accept-encoding": "gzip",
        // 'Content-type': "application/json"
      }
    }
  }, {
    enable_forward: true,
    request: {
      path: "/posts/:post_id",
      method: "PATCH",
      payload: {
        title: 'foo'
      },
      headers: {
        skip_forward_all_headers: true,
        skip_req_headers: true,
        "X-API-TOKEN": getAPIToken()
      },
      beforeRequest: function ({params, body}) {
        // console.log("this", this);
        // console.log("params, body", params, body);
        let {post_id} = params;

        const getProfileToken = () => 'YYYYY';

        this.payload['post_multiplier'] = 2*post_id;
        this.headers["X-PROFILE-TOKEN"] = getProfileToken()
      }
    },
    response: {
      status: 206,
      response_data: {
        "Name":"Keshav Kumar",
        "userId":1,
        "githubHandle":"rnmkeshav"
      },
    }
  }]
}

module.exports = config;