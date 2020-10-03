const url = require("url");
const superagent = require("superagent");

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
    .send(payload)
    .query(query)
    .then(function (response_data) {
      resolve(response_data.body);
    })
    .catch(function (err) {
      console.debug(JSON.stringify({method, constructed_url, payload, query, headers}))
      console.debug("err", err)
      reject({
        text: err.response && err.response.text,
        status: err.status
      })

    })
  })
}

module.exports = networkCall;

