/**
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */
 
/**
 * /web/index.js
 *
 * This code handles intial render of the bot and any rerenders triggered
 * from javascript events.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.jsx');

const env = process.env.NODE_ENV || 'dev';
const config = require('../config.js')[env];
const bdk = require('@salesforce/refocus-bdk')(config);
const botName = require('../package.json').name;

//Room Details
const roomId = bdk.getRoomId();
let zip = null;
let temperature = null;
let weather = null;

//Event Handling
document.body.addEventListener('refocus.room.settings', handleSettings, false);
document.getElementById(botName).addEventListener('refocus.bot.data', handleData, false);
document.getElementById(botName).addEventListener('refocus.bot.actions', handleActions, false);
document.getElementById(botName).addEventListener('refocus.events', handleEvents, false);

/**
 * When a refocus.events is dispatch it is handled here.
 *
 * @param {Event} event - The most recent event object
 * @return null
 */
function handleEvents(event) {
  console.log('Event Activity', event);
}

/**
 * When a refocus.room.settings is dispatch it is handled here.
 *
 * @param {Room} room - Room object that was dispatched
 * @return null
 */
function handleSettings(room) {
  console.log('Room Activity', room);
}

/**
 * When a refocus.bot.data is dispatch it is handled here.
 *
 * @param {BotData} data - Bot Data object that was dispatched
 * @return null
 */
function handleData(data) {
  console.log('Bot Data Activity', data);
  if(data.detail.name === 'location'){
    zip = data.detail.value;
    const serviceReq = {
      'name': 'getCurrentWeather',
      'botId': botName,
      'roomId': roomId,
      'isPending': true,
      'parameters': [
        {
          'name': 'zipCode',
          'value': zip,
        }
      ]
    };
    bdk.createBotAction(serviceReq);
  } else {
    temperature = data.detail.name === 'temperature' ? data.detail.value : temperature;
    weather = data.detail.name === 'weather' ? data.detail.value : weather;
    renderUI(parseInt(temperature), weather, zip);
  }
}

/**
 * When a refocus.bot.actions is dispatch it is handled here.
 *
 * @param {BotAction} action - Bot Action object that was dispatched
 * @return null
 */
function handleActions(action) {
  console.log('Bot Action Activity', action);
  if (action.detail.name === 'getCurrentWeather') {
    const response = action.detail.response;
    temperature = response.Temperature.Imperial.Value + '';
    weather = response.WeatherText;
    bdk.upsertBotData(roomId, botName, 'temperature', temperature);
    bdk.upsertBotData(roomId, botName, 'weather', weather);
  }
}

/*
 * This function creates the action to get the weather from a location
 *
 * @param {Integer} newZip - Zip code of the weather location we want
 */
function getWeather(newZip){
  zip = newZip;
  bdk.upsertBotData(roomId, botName, 'location', newZip);
}

/*
 * The actions to take place before load.
 */
function init() {
  bdk.getBotData(roomId, botName)
    .then((res) => {
      const data = res.body;
      zip = data.filter((bd) => bd.name === 'location').length > 0 ?
        data.filter((bd) => bd.name === 'location')[0].value : null;
      temperature = data.filter((bd) => bd.name === 'temperature').length > 0 ?
        data.filter((bd) => bd.name === 'temperature')[0].value : null;
      weather = data.filter((bd) => bd.name === 'weather').length > 0 ?
        data.filter((bd) => bd.name === 'weather')[0].value : null;
      if (!zip) {
        bdk.findRoom(roomId)
        .then((res) => {
          const settings = res.body.settings ? res.body.settings : {};
          zip = settings.currentZipCode ? settings.currentZipCode : '90210';
          getWeather(zip);
          renderUI(null, null, null);  
        });
      } else {
        getWeather(zip);
        renderUI(parseInt(temperature), weather, zip);
      }
    });
}

/**
 * Render the react components with the data and templates needed
 */
function renderUI(temp, currentWeather, currentLocation){
  ReactDOM.render(
    <App 
      temperature={ temp }
      weather={ currentWeather }
      location={ currentLocation }
      getWeather={ getWeather }
    />,
    document.getElementById(botName)
  );
}

init();