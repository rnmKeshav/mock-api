let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let _isEmpty = require("lodash.isempty");

let forwardAll = require("./middleware/forward_all");
let insertConfig = require("./middleware/insert_config");

let app = express();

let config = {
  port: 3000,
  headers: {},
  forward: {
    mode: "all", //all, custom, none
    hostname: "https://jsonplaceholder.typicode.com/"
  },
}

app.use(cors());
app.use(bodyParser.json());

if (config && config.forward && config.forward.mode === "all") {
  app.all("*", insertConfig(config), forwardAll, function (req, res) {
    if (!_isEmpty(res.locals.error_data)) {
      let {status, text} = res.locals.error_data;
      
      res
      .status(status)
      .send(text);
    } else {
      
      res.send(res.locals.response_data)
    }
  });
}


app.get("/mock_status", function (req, res) {
  res.json({
    status: "ok"
  })
});


app.listen(config.port,  function () {
  console.log("Server is running on port", config.port);
})

