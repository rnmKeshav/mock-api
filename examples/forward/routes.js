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
      path: "/health/loggedinuserdetails",
      method: "GET",
      forward: {
        enabled: true
      }
    }
  },
  {
    request: {
      path: "/wave/surveys/feedbackexists",
      method: "POST",
      forward: {
        enabled: true
      }
    }
  },{
    request: {
      path: "/feedback/phone-number",
      method: "GET",
      forward: {
        enabled: true
      }
    }
  },
  {
    request: {
      path: "/wave/surveys",
      method: "POST",
      forward: {
        enabled: true
      }
    }
  },{
    request: {
      path: "/wave/reviewcontexts/decencychecks",
      method: "POST",
      forward: {
        enabled: true
      }
    }
  },
  {
    request: {
      path: "/wave/feedbacksurveys/:sid",
      method: "GET",
      forward: {
        enabled: true
      }
    }
  },{
    request: {
      path: "/wave/updatesurveys/:sid",
      method: "PATCH",
      forward: {
        enabled: true
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
  },
  {
    request: {
      path: "/marketplace-api/dweb/search/reach",
      method: "GET",
      forward: {
        enabled: true
      }
    }
  },{
    request: {
      path: "/marketplace-api/dweb/profile/provider/relation",
      method: "GET",
      forward: {
        enabled: true
      }
    }
  },
  {
    request: {
      path: "/marketplace-api/public/provider/:doctorUuid/establishment/:practiceUuid",
      method: "GET"
    },
    response: {
      data: {"prime":[{"prime_text":"Max. 15 mins wait + Verified details","prime_enabled_class":"","prime_disabled_class":"u-hide"}],"availability":[{"text":"Available Today","availability_class":"u-bold u-cushion--small-top u-green-text"}],"cashback":[{"amount":0,"cashback_hidden_class":"u-hide"}]}
    }
  }
];

module.exports = routes;
