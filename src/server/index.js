let express = require("express");

let { callRouteAction } = require("./middlewares");

let port = 6001;
let server = express();

let routes = [
  {
    request: {
      path: "/abc",
      method: "get"
    },
    response: {
      data: {
        a: "b"
      }
    },
    action: function(payload) {
      let { params, data } = payload;
      console.log("params", params, data, this.request);
    }
  }
];

routes.forEach(function(currentRoute) {
  let {
    request: { path, method = "get" },
    response: { data }
  } = currentRoute;

  server[method.toLowerCase()](path, callRouteAction(currentRoute), function(req, res) {
    res.json(data);
  });
});

server.listen(port, function() {
  console.log("Listening on port", port);
});
