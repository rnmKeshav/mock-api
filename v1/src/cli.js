#!/usr/bin/env node

/*
  for permission run "chmod +x cli.js "
*/
const fs = require("fs");
const path = require("path");

const createServer = require("./server/index");
const buildConfig = require("./build_config");

const argv = require("yargs").options({
  config: {
    alias: "c",
    describe: "Relative path to config",
    default: "mock-api.config.js",
    type: "string"
  },
  routes: {
    alias: "r",
    describe: "Relative path to route file",
    default: "",
    type: "string"
  }
}).argv;

const basePath = process.cwd();
let cliConfig = {};

if (argv.config) {
  let configPath = path.join(basePath, argv.c);
  if (fs.existsSync(configPath)) {
    console.log("Config file path:", configPath);
    cliConfig = require(configPath);
  }
}

if (argv.routes) {
  console.log("Routes path received", argv.routes);

  cliConfig.routes_path = argv.routes;
}

// if (cliConfig.routes_path) {
//   let routes_path = cliConfig.routes_path;
//   console.log("Route Path recieved: ", routes_path);

//   let routesPath = path.join(basePath, routes_path);
//   if (fs.existsSync(routesPath)) {
//     console.log("Found file: ", routesPath);
//     cliConfig.routes = require(routesPath);
//   } else {
//     console.error("Cannot find route file: ", routesPath);
//     process.exit(1);
//   }
// } else {
//   console.error("Please provide a route file in config");
//   process.exit(1);
// }

let config = buildConfig(cliConfig);

createServer(config);
