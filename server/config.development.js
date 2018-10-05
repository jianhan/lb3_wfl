'use strict';

const p = require('../package.json');
const version = p.version.split('.').shift();

module.exports = {
  restApiRoot: '/api' + (version > 0 ? '/v' + version : ''),
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  MONGODB_HOST: '192.168.224.2',
  MONGODB_PORT: 27017,
  MONGODB_USER: '',
  MONGODB_PASSWORD: '',
  MONGODB_NAME: 'lb3_wfl',
  COOKIE_SECRET: 'ZJ4EPZjgMxPYqrwIyLm9WeESEx6zpe',
  SESSION_SECRET: 'AYL6GGaLsAHmk98nv3AehgTtxblBig',
};
