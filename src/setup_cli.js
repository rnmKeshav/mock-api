#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
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


if (!fs.existsSync(destination)) {

  console.log("Config file does not exist. Creating one...")
  ncp.limit = 16;
  ncp(source, destination, function (err) {
  if (err) {
    return console.error(err);
  }

  console.info("config file created!");
  });

} else {
  console.info("Config file already exist", destination);
}

/*

// To automatically add mock-api in script of package.json.
 
const package_json_path = path.join(cwd, "package.json");
let package_json  = require(package_json_path);
if (package_json) {
  Object.assign(package_json.scripts, {
    "mock-api": "mock-api"
  });

  fs.writeFileSync(package_json_path, JSON.stringify(package_json));

  console.log("Updated package.json. Run 'npm run mock-api' in terminal")
}

*/