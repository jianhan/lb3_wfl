'use strict';

const authMiddleware = require('../middleware/auth');

module.exports = (app) => {
  const User = app.models.User;

  // define profile method 
  User.profile = (req, cb) => {
    cb(null, req.user, 'application/json');
  };
  User.remoteMethod(
    'profile', {
      returns: {
        arg: 'profile',
        type: 'string',
      },
      http: {
        verb: 'get',
      },
      accepts: [{
        arg: 'req',
        type: 'object',
        http: {
          source: 'req',
        },
      }],
    }
  );
};
