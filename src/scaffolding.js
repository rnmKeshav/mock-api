#!/usr/bin/env node

var ncp = require('ncp').ncp;
const path = require("path");

const basePath = process.cwd();

const source = path.join(__dirname, "../scaffolding");
const destination = path.join(basePath, "mock-server");

ncp.limit = 16;
ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});