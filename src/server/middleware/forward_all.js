var networkCall = require("../network_call");

const forwardAll = function (req, res, next) {
  let {method, url, app: {locals: {config}}} = req;
  let {headers, forward: {hostname}} = config;

  networkCall({url, method, config, headers, hostname})
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
