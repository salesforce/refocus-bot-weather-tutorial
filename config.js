/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * config.js
 *
 * Config file for different deployments - dev, staging, production
 *
 */

module.exports = {
  dev: {
    refocusUrl: 'http://localhost:3000',
    token: process.env.API_TOKEN,
    socketToken: process.env.SOCKET_TOKEN,
    weatherToken: process.env.ACCUWEATHER_TOKEN,
  },
  staging: {
    refocusUrl: 'http://refocus-staging.herokuapp.com',
    token: process.env.API_TOKEN,
    socketToken: process.env.SOCKET_TOKEN,
    weatherToken: process.env.ACCUWEATHER_TOKEN,
  },
  sandbox: {
    refocusUrl: 'https://refocus-sandbox.internal.salesforce.com',
    token: process.env.API_TOKEN,
    socketToken: process.env.SOCKET_TOKEN,
    weatherToken: process.env.ACCUWEATHER_TOKEN,
  },
  production: {
    refocusUrl: 'https://refocus.internal.salesforce.com',
    token: process.env.API_TOKEN,
    socketToken: process.env.SOCKET_TOKEN,
    weatherToken: process.env.ACCUWEATHER_TOKEN,
  },
};