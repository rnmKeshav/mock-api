let express = require("express");

let { callRouteAction, forwardRequest } = require("./middlewares");
let { setHeader } = require("./middlewares/set_headers");

let port = 6001;
let server = express();
let cors = require("cors");

server.use(cors());

let routes = [
  {
    request: {
      path: "/logged_in_user",
      method: "get",
      payload: {},
      forward: {
        enabled: true,
        //hostname: "https://www.practo.com",
        headers: {}
      }
    },
    response: {
      data: {
        a: "b"
      },
      headers: {
        //status: 401,
        "x-am": "hhh"
      }
    },
    action: function(payload) {
      let { params, data } = payload;
      //console.log("params", params, data, this.request);
    }
  }
];

routes.forEach(function(currentRoute) {
  let {
    request: { path, method = "get" },
    response: { data, headers }
  } = currentRoute;

  server[method.toLowerCase()](
    path,
    callRouteAction(currentRoute),
    forwardRequest(currentRoute),
    setHeader(headers),
    function(req, res) {
      let responseData = res.locals.customResponse || data;

      res.json(responseData);
    }
  );
});

server.listen(port, function() {
  console.log("Listening on port", port);
});
