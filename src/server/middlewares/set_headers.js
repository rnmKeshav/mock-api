const setHeader = headers => (req, res, next) => {
  let localResponseData = res.locals;
  headers = Object.assign(headers, localResponseData.headers);
  let headerStatus = headers.status || 200;
  res.status(headerStatus);
  delete headers.status;

  for (let key in headers) {
    if (headers.hasOwnProperty(key)) {
      res.setHeader(key, headers[key]);
    }
  }

  next();
};

module.exports = setHeader;
