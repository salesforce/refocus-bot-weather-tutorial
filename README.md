# Weather Bot Tutorial
This a bot that can take a location and using the [Accuweather API](https://developer.accuweather.com/accuweather-locations-api/apis) to get weather a zip code. The bot was developed to be as the outcome of th [IMC bot development tutorial](https://git.soma.salesforce.com/pages/Refocus-Bots/Docs/tutorials/step0/).

## Features
*	Take input from UI
*	Gets intial state from settings
*	Return weather for a location by zip code

## Getting Started

### Env Variables
If you want to test this locally you will need some environment variables; this project supports [dotenv](https://github.com/motdotla/dotenv). Put your environmental variables into `.env` file or export into your shell session if desired.

*	```API_TOKEN``` - Used for Requests to Refocus. Created in refoucs/tokens/new.
*	``SOCKET_TOKEN`` - (Returned Upon Installation) - Used for Socket Connection.
*	``ACCUWEATHER_TOKEN`` - Private token that Accuweather API gives you so you can make request for current weather

### Bot Settings
```currentZipCode``` - The intial zip code for the weather if no other location is specificed in bot data

### Test Bot Locally without Refocus
1.  Clone this repo
2.	Add any server side code you want to bot.js
3.	Add any UI side code to web/index.js
4.  Comment-out ``bdk.installOrUpdateBot(packageJSON);`` from ./index.js
5.	```npm login``` - You need to login to get salesforce/bdk
6.	```npm install```
7.	```npm start```
8.	Test locally (default port 5000)

### Test Bot Locally with Refocus
1.  Clone this repo
2.	Add any server side code you want to index.js
3.	Add any UI side code to web/index.js
4.	Install and run Refocus https://salesforce.github.io/refocus/docs/04-quickstartlocal.html
5.	Create a token https://salesforce.github.io/refocus/docs/10-security.html
6.	Add token to Bot enviroment variables -  ```echo "API_TOKEN={{UI TOKEN from Step 5}}" > .env ```
7.	```npm login``` - You need to login to get salesforce/bdk
8.	```npm install```
9.	```npm start```
10.	If it is your first install you will be returned a ```Authorization Token``` for sockets
11.	Add authorization token to Bot enviroment variables -  ```echo "SOCKET_TOKEN={{UI TOKEN from Step 9}}" >> .env```
12.	```npm start```
13. Create a RoomType in Refocus with your Bot added
14. Create a Room in Refocus with your new RoomType
15.	Go to ```https://host:port/rooms/``` and open your new room

## Contributing
If you have any ideas on how this project could be improved, please feel free. The steps involved are:
* Fork the repo on GitHub.
* Clone this project to your machine.
* Commit changes to your own branch.
* Push your work back up to your fork.
* Submit a Pull Request so we can review it!

## Release History
Follows [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning#semver-for-publishers)

* 1.0.0 Bot Created for Tutorial.