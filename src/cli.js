#!/usr/bin/env node

const path = require("path");
var ncp = require('ncp').ncp;

const cwd = process.cwd();

const source = path.join(__dirname, "./mock-api.config.default.js");
const destination = path.join(cwd, "mock-api.config.js");

ncp.limit = 16;
ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }

 console.info("config file created!")
});
