const path = require("path");
const fs = require("fs");

const {isEmpty} = require("./server/utilities");
const defaultConfig = require("./server/default_config");

const basePath = process.cwd();

const buildConfig = (config = {}) => {
  if (isEmpty(config)) {
    console.error("Config not found. Using defaults");
    config = defaultConfig;
  }

  let routes_path = config.routes_path;
  if (routes_path) {
    console.log("Route Path recieved: ", routes_path);

    if (fs.existsSync(routes_path)) {
      config.routes = require(routes_path);
    } else {
      console.error("Cannot find route file: ", routes_path);
      process.exit(1);
    }
  } else {
    console.error("Please provide a route file path in config");
    process.exit(1);
  }

  if (!config.port) {
    config.port = defaultConfig.port;
  }

  if (isEmpty(config.forward)) {
    config.forward = defaultConfig.forward;
  }

  return config;
}

module.exports = buildConfig;
