const isEmpty = function(payload) {
  if (payload && typeof payload !== 'object') {
    return false;
  }

  for (let key in payload) {
    if (payload.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};

module.exports = {
  isEmpty
};
