var networkCall = require("../network_call");

const forwardAll = function (req, res, next) {
  let { method, _parsedUrl: { pathname }, app: { locals: { config } }, query: req_query, headers: req_headers, body } = req;
  let { forward: { hostname, query: custom_query, headers: custom_headers } } = config;
  let query = Object.assign({}, req_query, custom_query);
  let headers = Object.assign({}, custom_headers);

  networkCall({ pathname, method, headers, hostname, query, payload: body })
    .then(function (response_data) {

      Object.assign(res.locals, {
        response_data
      })
    }).catch(function (data) {
      console.log("data", data)
      Object.assign(res.locals, {
        error_data: data
      })
    })
    .finally(function () {
      next();
    })

}

module.exports = forwardAll;
