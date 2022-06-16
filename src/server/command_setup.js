const { program } = require('commander');

program
  .name('mock-api')
  .description('CLI to mock server response')
  .option('-c, --config <string>', 'Relative path to config', "mock-api.config.js");
program.parse();

module.exports = program;
