'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'DATA_BACKEND',
    'AZURE_DB_HOST',
    'AZURE_DB_USER',
    'AZURE_DB_PASSWORD',
    'AZURE_DB',
    'NODE_ENV',
    'PORT'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    // dataBackend can be 'datastore', 'cloudsql', or 'mongodb'. Be sure to
    // configure the appropriate settings for each storage engine below.
    // If you are unsure, use datastore as it requires no additional
    // configuration.
    DATA_BACKEND: 'datastore',

    // This is the id of your project in the Google Cloud Developers Console.
    AZURE_DB_HOST: '',
    AZURE_DB_USER: '',
    AZURE_DB_PASSWORD: '',
    AZURE_DB: '',

    NODE_ENV: 'development',

    PORT: 3000
  });
