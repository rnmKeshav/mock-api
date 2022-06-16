#!/usr/bin/env node

let express = require("express");
const fs = require("fs");
const path = require("path");

let cors = require("cors");
let bodyParser = require("body-parser");
let _isEmpty = require("lodash.isempty");

let forwardAll = require("./middleware/forward_all");
let insertConfig = require("./middleware/insert_config");
let handleCustomRoute = require("./middleware/handle_custom_route");
let command = require('./command_setup');

let app = express();

/**
 * forward.mode = {
 *  all: "Forward all the request and respond with exact same response as forwarded server has responded, irrespective of `routes`",
 *  custom: "Forward all requests. Also before forwarding request check if a route is specified in `routes` if yes, do the manipulation"
 * }
 * 
 **/

 
const options = command.opts();
let config = {
  port: 3000,
  forward: {}
};


if (options.config) {
  const cwd = process.cwd();
  let configPath = path.resolve(cwd, options.config);

  if (fs.existsSync(configPath) && !fs.lstatSync(configPath).isDirectory()) {
    console.log("Config file path:", configPath);
    config = require(configPath);
  } else {
    console.log("Given config file does not exists or it is not a valid file ! Using default config...")
  }
}
/*
config = {
  port: 3000,
  headers: {},
  forward: {
    hostname: "https://jsonplaceholder.typicode.com",
    headers: {
      cookie: "pelUUID=96d2cfa0-e0ce-4795-beb3-917c5c1dd79c; _ga=GA1.2.1683668930.1598687051; _gcl_au=1.1.1869798560.1598687054; _fbp=fb.1.1598706524131.962812492; mp_cbdf6b23be7235b4389988aaa8ed0ada_mixpanel=%7B%22distinct_id%22%3A%20%22174599d97423ae-04b981fbbdeb46-39760e5a-144000-174599d97434f8%22%2C%22%24device_id%22%3A%20%22174599d97423ae-04b981fbbdeb46-39760e5a-144000-174599d97434f8%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.practo.com%2Fpartners%2Fprofile%3Fis_open%3Dtrue%22%2C%22%24initial_referring_domain%22%3A%20%22www.practo.com%22%7D; mp_32682294086eb4c6582c358393c6764f_mixpanel=%7B%22distinct_id%22%3A%20%22173815%22%2C%22%24device_id%22%3A%20%22174599cf42024e-0f8289081aecbd-39760e5a-144000-174599cf4211f7%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.practo.com%2Fpartners%2Fprofile%22%2C%22%24initial_referring_domain%22%3A%20%22www.practo.com%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22%24user_id%22%3A%20%22173815%22%7D; mp_85d643d7bc71611832663cd683666848_mixpanel=%7B%22distinct_id%22%3A%20%221746cd9028811e-0f3fba70a429a9-39760e5a-144000-1746cd9028917e%22%2C%22%24device_id%22%3A%20%221746cd9028811e-0f3fba70a429a9-39760e5a-144000-1746cd9028917e%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; availability_pla_client_id=BC968952-0146-260A-B456-D7C506D50D2B; p_utm_tags=%7B%22utm_source%22%3A%22consumer%20home%22%2C%22utm_medium%22%3A%22web%22%2C%22utm_campaign%22%3A%22core%22%7D; mp_0af2582aea04ca9f34ccb8d74ab0dc58_mixpanel=%7B%22distinct_id%22%3A%20%221746cd907e77d2-0f00b4019e6c22-39760e5a-144000-1746cd907e8689%22%2C%22%24device_id%22%3A%20%221746cd907e77d2-0f00b4019e6c22-39760e5a-144000-1746cd907e8689%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; __practo_sweep__id.ab61=2d18247993c84ad6.1598942594.27.1601558885.1601287728.f5fb1eb1-3c25-4e2b-9578-927a99e3851f; __insp_wid=1747898862; __insp_slim=1601558884571; __insp_nv=true; __insp_targlpu=aHR0cHM6Ly93d3ctbGF0ZXN0LnByYWN0by5jb20vYmFuZ2Fsb3JlL2RvY3Rvci9zYWNoaW4tNTYtZ2VuZXJhbC1waHlzaWNpYW4vcmV2aWV3cw%3D%3D; __insp_targlpt=UGF0aWVudCBTdG9yaWVzIGZvciBEci4gU2FjaGluICwgUGF0aWVudCBFeHBlcmllbmNlcywgR2VuZXJhbCBQaHlzaWNpYW4gLSBTYWhha2FyYW5hZ2FyLCBCYW5nYWxvcmUgfCBQcmFjdG8%3D; __insp_norec_sess=true; __cfduid=da08e23f419e967372ed236671ad540231601559214; _oauth2_proxy=ZW1haWw6a2VzaGF2Lmt1bWFyQHByYWN0by5jb20gdXNlcjprZXNoYXYua3VtYXJ8RWc5VUtpV0JITUVRYW5vSXppbzh2NU0rNlNPNkJ4NFg0THJ1WkVFeFdlYjF4TU1yaG1acytHaWxTV1I1T3VSWEtkMnJmK1pyc3dnNGRRdE9JZXFudlRKMnVJV2hJT1pwOW82ejh1TUxiQTJrVUhsUzY2T25zazI5OTYyc00xUmU0dGZlbm9WMkJMYzltaWhEZmFmbmxZQVNINWxDWDIzWmNEUThGNkZEcXR5VFFsRHBxSFRibHFQOVJHREFzWUlXSklzOXMvNjl2N3BjRDlwTmwxWnU3V1FMQTlYelZoeUJLWHVZYWhpL2wzbldEU2dOcmttMXJ4UndGZjlWfDE2MDE2NDk2MjZ8a24vRXFnRTQ5a2FIajVobFZibUtOV1VCb2p0eW55VWlZNStyYk1qQ0lwOTRwdTlHaTRLaENxU0MvQ2RBNXI1amNmVUtaeVpDTUQrU1FkSS8rYlBGZ1IzVVdDdkpJUjRtQ1YvTE91S0N1QW5xR3k5dmhsekt6Rzl1YmNETlIrNlVFRTh4YlFkRGlrTXFQUmdBQ09VUmY1K3BZQUliV3M0PQ==|1601646027|TAd-ZthVVDAkran_8PGo5kcXT1s=; lux_uid=160171983121532125; PHPSESSID=uclu6tvalj9rnl1rpprple1gi5; _gid=GA1.2.817363285.1601719832; hl=en; pelUUID=174edf11de59da-068985a51643be-5b7f7327-5294d-174edf11de690c; __cfruid=e14408ee99e3a9ae0b2b1bcdfe71dda5c137e3a4-1601719873; WZRK_G=9746059b128d44d1bc23bec757dfb5c3; _gat=1; _gat_fabric=1; WZRK_S_8W6-695-WK5Z=%7B%22p%22%3A9%2C%22s%22%3A1601719832%2C%22t%22%3A1601720622%7D; sso=a62e8d17-ce8f-4dd0-be0e-e77549e05292; modal_login=true",
      host: "jsonplaceholder.typicode.com",
      accept: "application/json",
      referer: "https://jsonplaceholder.typicode.com/",
      "accept-encoding": "gzip"
    }
  },
  routes: [{
    enable_forward: true, // true, false. 
    request: {
      path: "/search/users",
      method: "GET",
      headers: {
        Host: "api.github.com"
      },
      hostname:"https://api.github.com/",
      payload: {},
      beforeRequest: function () {
        // This gets called before network request
        // This method can change request object.
      }
    },
    response: {
      headers: {
        "custom_response_header": "custom_response_header_value"
      },
      status: "",
      response_data: {},
      beforeResponse: function () {
        // This method gets called after network request
        // This method can change response object
      }
    }
  }]
}

*/


app.use(cors());
app.use(bodyParser.json());

if (config && config.routes) {
  config.routes.forEach(function (route) {
    let { request = {}, response = {} } = route;
    let { path, method } = request;
    method = (method || "get").toLowerCase();

    if (!path) {
      return;
    }

    app[method](`${path}`, insertConfig(config), handleCustomRoute(route), function (req, res) {
      if (!_isEmpty(res.locals.error_data)) {
        let { status, text } = res.locals.error_data;

        if (status) {
          res.status(status).send(text);
        }
        res.send(text);
      } else {
        let { status: custom_status, headers: custom_headers } = response;
        if (custom_status) {
          res.status(custom_status)
        }

        if (custom_headers) {
          res.set(custom_headers);
        }

        res.send(response.response_data || res.locals.response_data)
      }
    })
  })
}

// console.log("All registered routes");
// app._router.stack.forEach(function(r){
//   if (r.route && r.route.path){
//     console.log(r.route.path)
//   }
// })

if (config) {
  app.all("*", insertConfig(config), forwardAll, function (req, res) {
    if (!_isEmpty(res.locals.error_data)) {
      let { status, text } = res.locals.error_data;

      if (status) {
        res.status(status);
      }
      res.send(text);
    } else {

      res.send(res.locals.response_data)
    }
  });
}


app.get("/mock_status", function (req, res) {
  res.json({
    status: "ok"
  })
});


app.listen(config.port, function () {
  console.log("Server is running on port", config.port);
})

