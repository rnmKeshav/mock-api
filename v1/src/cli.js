#!/usr/bin/env node

/*
  for permission run "chmod +x cli.js "
*/
const fs = require("fs");
const path = require("path");
const { program } = require('commander');

const createServer = require("./server/index");
const buildConfig = require("./build_config");
program
  .name('cli.js')
  .description('Build config')
  .option('-c, --config <string>', 'Relative path to config', "mock-api.config.js")
  .option('-r, --routes <string>', 'Relative path to route file');

program.parse();
const options = program.opts();


const basePath = process.cwd();
let cliConfig = {};

if (options.config) {
  let configPath = path.join(basePath, options.config);
  if (fs.existsSync(configPath) && !fs.lstatSync(configPath).isDirectory()) {
    console.log("Config file path:", configPath);
    config = require(configPath);
  } else {
    console.log("Given config file does not exists or it is not a valid file ! Using default config...")
  }
}

if (options.routes) {
  console.log("Routes path received", options.routes);

  cliConfig.routes_path = options.routes;
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
