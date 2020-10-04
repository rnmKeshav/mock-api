#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
var ncp = require('ncp').ncp;

const cwd = process.cwd();

const source = path.join(__dirname, "./mock-api.config.default.js");
const destination = path.join(cwd, "mock-api.config.js");


exec("nodemon -v", function (err, stdout) {
  let is_nodemon_installed = false;

  console.log(`nodemon -v:`, stdout);
  let version_number_pattern = /\d+\.\d*\.*\d*/

  if (version_number_pattern.test(stdout)) {
    is_nodemon_installed= true;
  }

  if (!is_nodemon_installed) {
    console.info("Please wait while nodemon is getting installed...");
    exec("npm install -g nodemon", function (error, stdout, stderr) {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }
  
})


ncp.limit = 16;
ncp(source, destination, function (err) {
 if (err) {
  return console.error(err);
 }

 console.info("config file created!");
});
