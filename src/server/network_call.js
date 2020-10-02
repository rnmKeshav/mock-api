const url = require("url");
const superagent = require("superagent");

const networkCall = function (payload) {
  let {method, url: req_url, headers ={}, query={}, hostname} = payload;

  if (!hostname) {
    throw new Error("Please provide hostname for network call")
  }

  method = method.toLowerCase();
  const constructed_url = new URL(req_url, hostname);

  return new Promise(function (resolve, reject) {
    superagent[method](constructed_url)
    .set(headers)
    .query(query)
    .then(function (response_data) {
      resolve(response_data.body);
    })
    .catch(function (err) {
      
      reject({
        text: err.response.text,
        status: err.status
      })
    })
  })
}

module.exports = networkCall;

