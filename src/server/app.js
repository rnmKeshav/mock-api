let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let chalk = require("chalk");

let server;

const createApp = (port, is_restart) => {
  let app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get("/mock_status", function (req, res) {
    res.json({
      status: "ok"
    })
  });

  function startServer () {
    server = app.listen(port, function () {
      console.log(chalk.green("Server is running on port"), port);
    });
  }
  
  if (is_restart) {
    console.log(chalk.green("restarting server..."));

    server.close(() => {
      startServer();
    })
  } else {
    startServer();
  }

  return app;
}

module.exports = createApp;

