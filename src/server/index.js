let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");

let setHeader = require("./middlewares/set_headers");
let forwardRequest = require("./middlewares/forward_request");
let callRouteAction = require("./middlewares/call_route_action");

let buildConfig = require("../build_config");

let server = express();

server.use(cors());
server.use(bodyParser.json());

// let routes = [
//   {
//     request: {
//       path: "/logged_in_user",
//       method: "get",
//       payload: {},
//       forward: {
//         enabled: true,
//         hostname: "https://www.practo.com",
//         headers: {}
//       }
//     },
//     response: {
//       data: {
//         a: "b"
//       },
//       headers: {
//         //status: 401,
//         "x-am": "hhh"
//       }
//     },
//     action: function(payload) {
//       let { params, data } = payload;
//       //console.log("params", params, data, this.request);
//     }
//   }
// ];

const createServer = config => {
  config = buildConfig(config);
  let { port, routes = [] } = config;
  let forwardRequestWithConfig = forwardRequest(config);

  routes.forEach(function(currentRoute) {
    let { request: { path, method = "get" } = {} } = currentRoute;

    server[method.toLowerCase()](
      path,
      callRouteAction(currentRoute),
      forwardRequestWithConfig(currentRoute),
      setHeader(currentRoute),
      function(req, res) {
        let { response: { data } = {} } = currentRoute;
        
        let responseData = res.locals.customResponse || data;

        res.json(responseData);
      }
    );
  });

  server.listen(port, function() {
    console.log("Server running at port:", port);
  });
};

module.exports = createServer;
