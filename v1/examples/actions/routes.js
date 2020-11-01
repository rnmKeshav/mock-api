/*
  Route object format 
  {
    request: { // Details regarding API request you are making
      path: "/path/to/your/request/api",
      method: "request method(get, post, delete, patch etc)"
    },
    response: { // Details regarding API response for requested path we want   
      data: {},  // Response data wanted when we make request to above path
      headers: {
        status: 201 // Response status,
        "X-API-TOKEN": "some_random_value"
      }
    },
    action: function({param, data, query}) { // A function which has access to current route object.
      //param: request parameters
      // data: payload data sent in request for post/patch
    }
  }
*/
let routes = [
  {
    request: {
      path: "/user",
      method: "get",
      forward: {
        enabled: false
      }
    },
    response: {
      data: {
        id: 5145606,
        account_id: "6939366",
        email: "",
        first_name: "Keshav Kumar",
        phone_number: "+919008001555",
        country: "IN",
        agent: false
      }
    }
  },
  {
    request: {
      path: "/users",
      method: "POST"
    },
    response: {
      data: "Bad request",
      headers: {
        status: 400
      }
    }
  },
  {
    request: {
      path: "/users/:userId",
      method: "PATCH"
    },
    response: {
      data: {
        id: 5145606,
        account_id: "6939366",
        email: "",
        first_name: "Keshav Kumar new",
        phone_number: "+919008001556",
        country: "IN",
        agent: false
      }
    },
    action: function(payload) {
      let { param, data } = payload;

      this.response.data = Object.assign({}, this.response.data, data);
    }
  },
  {
    request: {
      path: "/users/:userId",
      method: "Delete"
    },
    response: {
      data: {}
    },
    action: payload => {}
  }
];

module.exports = routes;
