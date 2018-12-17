const request = require("superagent");
const { isEmpty } = require("./utilities");

/*
  reqMethod: 'post/patch/get',
  endpoint: '/practices',
  options: {
    query: {
      with_doctors: true/false
    },
    payload: {            //Required for post/patch data
      doctor_id: 1
    },
    headers: {}
  },
  host: 'www.practo.com'
*/

module.exports = function _request(reqMethod, endpoint = "", options = {}, host = "") {
  let { query, payload, headers } = options;
  let url = host + endpoint;

  let req = request[reqMethod.toLowerCase()](url)
    .query(query)
    .set(headers);

  if (reqMethod.toLowerCase() !== "get") {
    req = req.send(payload || {});
  }

  return new Promise((resolve, reject) => {
    req.end((err, res) => {
      let response;
      if (err) {
        reject(err);
      }
      try {
        if (res.text && res.text !== "") {
          response = JSON.parse(res.text);
        }
      } catch (e) {
        reject(e);
      }

      resolve(response);
    });
  });
};
