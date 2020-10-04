#!/usr/bin/env node


// This file is not getting used currently. Dummy file to remind about auto script running from package.json to use local nodemon

const { spawn } = require("child_process");

const ls = spawn("ls", ["-al"]);

ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

ls.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
});
