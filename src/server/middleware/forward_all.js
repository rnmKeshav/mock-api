var networkCall = require("../network_call");

const forwardAll = function (req, res, next) {
  let {method, url, app: {locals: {config}}, query: req_query, headers: req_headers} = req;
  let { forward: {hostname, query: custom_query, headers: custom_headers}} = config;
  let query = Object.assign({}, req_query, custom_query);
  let headers = Object.assign({}, req_headers, custom_headers);

  networkCall({url, method, headers, hostname, query})
    .then(function (response_data) {
      
      Object.assign(res.locals, {
        response_data
      })
    }).catch(function (data){

      Object.assign(res.locals, {
        error_data: data
      })
    })
    .finally(function () {
      next();
    })

}

module.exports = forwardAll;
