'use strict';

module.exports = (app) => {
  const User = app.models.User;

  User.account = (cb) => {
    cb(null, 'Greetings... test');
  };

  User.remoteMethod(
    'account', {
      returns: {
        arg: 'greeting',
        type: 'string',
      },
      http: {
        verb: 'get'
      },
    }
  );
};
