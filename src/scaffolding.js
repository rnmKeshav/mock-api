#!/usr/bin/env node

var ncp = require('ncp').ncp;
const path = require("path");
const yargs = require("yargs");

const basePath = process.env.INIT_CWD;

// run mock-api-scaffold --folder_name="desired_folder_name"

let argv = require("yargs").options({
  "folder_name": {
    alias: "fn",
    describe: "Name of the folder",
    default: "mock-server",
    type: "string"
  }
}).parse();

const source = path.join(__dirname, "../scaffolding");
const destination = path.join(basePath, argv.folder_name);

ncp.limit = 16;
ncp(source, destination, function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});