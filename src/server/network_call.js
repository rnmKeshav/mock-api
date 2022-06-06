const URL = require("url").URL;
const superagent = require("superagent");
const _isEmpty = require("lodash.isempty");
const chalk = require("chalk");

const networkCall = function (parameters) {
  let { method, pathname, headers = {}, query = {}, hostname, payload } = parameters;
  // console.log("parameters", parameters);

  if (!hostname) {
    throw new Error("Please provide hostname for network call")
  }

  method = method.toLowerCase();
  const constructed_url = new URL(pathname, hostname);
  // console.log("headers", headers);
  // console.log("payload", payload);
  
  return new Promise(function (resolve, reject) {
    superagent[method](constructed_url)
      .set(headers)
      .send(!_isEmpty(payload) ? payload : null)
      .query(query)
      .then(function (response_data) {
        console.log(chalk.green(JSON.stringify({ method, constructed_url, payload, query })));
        // console.log("response_data.body", response_data);
        let res_body = response_data.body;
        let res_status = response_data.statusCode;
        let res_header = response_data.header;
        resolve({
          body: res_body,
          status: res_status,
          // header: res_header
        });
      })
      .catch(function (err) {
        console.log(chalk.red(JSON.stringify({ method, constructed_url, payload, query, headers })));
        let error_text = err.response && err.response.text;
        let error_status = err.status;
        if (!error_text || !error_status) {
          console.log(chalk.redBright("err", err));
          reject();
        };
        // console.log("error object in network call", err);
        reject({
          text: error_text,
          status: err.status
        })

      })
  })
}

module.exports = networkCall;

