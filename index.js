/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * ./index.js
 *
 * This code handles will listen to refocus and handle any activity
 * that requires the bot server attention.
 */
'use strict';

require('dotenv').config();
const express = require('express');
const request = require('superagent');
const app = express();
const http = require('http');
const io = require('socket.io-client');
const env = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 5000;
const config = require('./config.js')[env];
const { socketToken, weatherToken } = config;
const packageJSON = require('./package.json');
const bdk = require('@salesforce/refocus-bdk')(config);

// Installs / Updates the Bot
bdk.installOrUpdateBot(packageJSON);

//Event Handling
bdk.refocusConnect(app, socketToken);
app.on('refocus.events', handleEvents);
app.on('refocus.bot.actions', handleActions);
app.on('refocus.bot.data', handleData);
app.on('refocus.room.settings', handleSettings);

function getCurrentWeather(zip) {
  return new Promise((resolve, reject) => {
    request
      .get('http://dataservice.accuweather.com/locations/v1/postalcodes/search?q=' + zip + '&apikey=' + weatherToken)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          request
            .get('http://dataservice.accuweather.com/currentconditions/v1/' + res.body[0].Key + '?apikey=' + weatherToken)
            .end((error, response) => {
              if (error) {
                reject(error);
              } else {
                resolve(response);
              }
            });
        }
      });
  });
}

/**
 * When a refocus.events is dispatch it is handled here.
 *
 * @param {Event} event - The most recent event object
 * @return null
 */
function handleEvents(event){
  console.log('Event Activity', event);
}

/**
 * When a refocus.room.settings is dispatch it is handled here.
 *
 * @param {Room} room - Room object that was dispatched
 * @return null
 */
function handleSettings(room){
  console.log('Room Settings Activity', room);
}

/**
 * When a refocus.bot.data is dispatch it is handled here.
 *
 * @param {BotData} data - Bot Data object that was dispatched
 * @return null
 */
function handleData(data){
  console.log('Bot Data Activity', data);
}

/**
 * When a refocus.bot.actions is dispatch it is handled here.
 *
 * @param {BotAction} action - Bot Action object that was dispatched
 * @return null
 */
function handleActions(action){
  console.log('Bot action Activity', action);
  if (action.name === 'getCurrentWeather'){
    const id = action.id;
    const params = action.parameters;
    const zipCode = params.filter((param) =>
      param.name === 'zipCode')[0].value;
      getCurrentWeather(zipCode).then(function(result) {
        const eventObject = {
          log: packageJSON.name +
          ' got weather from ' + zipCode,
          context: {
            'type': 'Event',
            'response': result.body[0]
          },
        };
        bdk.respondBotAction(id, result.body[0], eventObject);
      });
  }
}

app.use(express.static('web/dist'));
app.get('/*', function(req, res){
  res.sendFile(__dirname + '/web/dist/index.html');
});

http.Server(app).listen(PORT, function(){
  console.log('listening on: ', PORT);
});
