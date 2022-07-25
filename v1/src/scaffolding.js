#!/usr/bin/env node

var ncp = require('ncp').ncp;
const path = require("path");
const { program } = require('commander');

const basePath = process.env.INIT_CWD;

// run mock-api-scaffold --folder_name="desired_folder_name"

program
  .name('run mock-api-scaffold')
  .description('Scaffold')
  .option('-fn, --folder <string>', 'Name of the folder', "mock-server");
program.parse();
const options = program.opts();
const source = path.join(__dirname, "../scaffolding");
const destination = path.join(basePath, options.folder_name);

ncp.limit = 16;
ncp(source, destination, function (err) {
 if (err) {
   throw err;
 }
 console.log('done!');
});