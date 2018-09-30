'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = module.exports = loopback();
const authMiddleware = require('./middleware/auth')

app.get('/auth/account', authMiddleware(), function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(req.user));
});

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Create an instance of PassportConfigurator with the app instance
const PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
const passportConfigurator = new PassportConfigurator(app);

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// Load the provider configurations
let config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.error('Please configure your passport strategy in `providers.json`.');
  console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
  process.exit(1);
}

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));

passportConfigurator.init(false);

// Set up related models
passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});
// Configure passport strategies for third party auth providers
for (let s in config) {
  let c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
