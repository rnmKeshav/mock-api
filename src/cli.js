#!/usr/bin/env nodemon

/*
  for permission run "chmod +x cli.js "
*/
const fs = require("fs");
const path = require("path");
const createServer = require("./server/index");

const defaultConfigPath = "./server/default_config";

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
let apiConfig = {};

if (argv.config) {
  let configPath = path.join(basePath, argv.c);
  if (fs.existsSync(configPath)) {
    console.log("Found file: ", configPath);
    apiConfig = require(configPath);
  } else {
    console.error("Config file not found. Using default config");
    apiConfig = require(defaultConfigPath);
  }
}

if (argv.routes) {
  console.log("Routes path received", argv.routes);

  apiConfig.routes_path = argv.routes;
}

if (apiConfig.routes_path) {
  let routes_path = apiConfig.routes_path;
  console.log("Route Path recieved: ", routes_path);

  let routesPath = path.join(basePath, routes_path);
  if (fs.existsSync(routesPath)) {
    console.log("Found file: ", routesPath);
    apiConfig.routes = require(routesPath);
  } else {
    console.error("Cannot find route file: ", routesPath);
    process.exit(1);
  }
} else {
  console.error("Please provide a route file in config");
  process.exit(1);
}

createServer(apiConfig);
