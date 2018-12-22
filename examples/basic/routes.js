let mockApi = require("../../src/server/index");
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
    }
  }
*/
let routes = [
  {
    request: {
      path: "/user",
      method: "get"
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
      path: "/user",
      method: "POST"
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
    }
  },
  {
    request: {
      path: "/user/:id",
      method: "Delete"
    },
    response: {
      data: {},
      headers: {
        status: 204
      }
    }
  }
];

module.exports = routes;
