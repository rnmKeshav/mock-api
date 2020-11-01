let routes = [
  {
    // Type 1: Getting response from local data
    request: { // Details regarding API request you are making
      path: "/users",
      method: "get"
    },
    response: { // Details regarding API response for requested path we want   
      data: [{ // Local response data
        id: 5145606,
        account_id: "12345",
        email: "keshav.xxx@gmail.com",
        name: "Keshav Kumar",
        phone_number: "+919008xx1555",
        country: "IN"
      }]
    }
  },
  // Type 2: Getting local custom response 
  { 
    request: { 
      path: "/users/:userId",
      method: "get"
    },
    response: {},
    action: function(payload) {
      let { params: {userId} } = payload;

      if (userId == 1) {
        this.response.data = {
          id: 5145606,
          account_id: "12345",
          email: "keshav.xxx@gmail.com",
          name: "Keshav Kumar",
          phone_number: "+919008xx1555",
          country: "IN"
        };
      } else {
        this.response = {
          data: {
            message: "User does not exist"
          },
          headers: {
            status: 404
          }
        }
      }
    }
  },
  // Type 3: Getting response from generic server(www.practo.com) defined in mock-api.config.js.
  {
    request: {
      path: "/logged_in_user",
      method: "GET",
      forward: {
        enabled: true
      }
    }
  },
  {
    // Type 4: Getting response from custom host(api.github.com)
    request: {
      path: "/search/users",
      method: "GET",
      forward: {
        enabled: true, // This has effect only when config's forward.mode=custom.
        hostname: "https://api.github.com",
      }
    }
  }
];

module.exports = routes;