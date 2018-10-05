const _ = require('lodash');
const httpStatus = require('http-status-codes');

module.exports = () => {
  return function authMiddleware(req, res, next) {
    if (!_.get(req, 'user', false)) {
      res.status(httpStatus.UNAUTHORIZED);
      res.send('Unauthorized');
      return;
    }
    next();
  };
};
