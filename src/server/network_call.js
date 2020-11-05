const URL = require("url").URL;
const superagent = require("superagent");
const _isEmpty = require("lodash.isempty");
const chalk = require("chalk");

const networkCall = function (parameters) {
  let {method, url: req_url, headers ={}, query={}, hostname, payload} = parameters;

  if (!hostname) {
    throw new Error("Please provide hostname for network call")
  }

  method = method.toLowerCase();
  const constructed_url = new URL(req_url, hostname);

  return new Promise(function (resolve, reject) {
    superagent[method](constructed_url.href)
    .set(headers)
    .send(!_isEmpty(payload)? payload: null)
    .query(query)
    .then(function (response_data) {
      console.log(chalk.green(JSON.stringify({method, constructed_url, payload, query})));
      resolve(response_data.body);
    })
    .catch(function (err) {
      console.log(chalk.red(JSON.stringify({method, constructed_url, payload, query, headers})));
      let error_text = err.response && err.response.text;
      let error_status = err.status;
      if (!error_text || !error_status) {
        console.log(chalk.redBright("err", err));
        reject();
      };
      reject({
        text: error_text,
        status: err.status
      })

    })
  })
}

module.exports = networkCall;

