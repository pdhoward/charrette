// Spoof on microservices
// testing constructors and and a framework for charrette
// =====================================
require( 'dotenv' ).config();

import express        from 'express';
import path           from 'path';
import bodyParser     from 'body-parser'
import cors           from 'cors';
import favicon        from 'serve-favicon';
import http           from 'http';
import setup          from './config/setup';
import secrets        from './config/secrets'
import socketIo       from 'socket.io'


const app =         express();
const host =        setup.SERVER.HOST;
const port =        setup.SERVER.PORT;

//////////////////////////////////////////////////////////////////////
///////////////////////// Middleware Config ////////////////////////////
//////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(cookieParser(sessionSecret));
app.use(favicon(path.join(__dirname, '.', '/client/img/favicon.ico')));

app.options('*', cors());
app.use(cors());

const httpServer =      new http.Server(app);
//const htmlFile =        path.resolve(__dirname, '../client/index.html');
//const buildFolder =     path.resolve(__dirname, '../build');


// Import the Keys file
var keys = require("./keys.js");

// Import the Twitter NPM package.
var Twitter = require("twitter");

// Import the request npm package.
var request = require("request");

// Import the FS package for read/write.
var fs = require("fs");

// FUNCTIONS
// =====================================

// Writes to the log.txt file
var writeToLog = function(data) {
  fs.appendFile("log.txt", "\r\n\r\n");

  fs.appendFile("log.txt", JSON.stringify(data), function(err) {

    if (err) {
      return console.log(err);
    }

    console.log("log.txt was updated!");
  });
};

// Function for running a Twitter Search
var getMyTweets = function() {

  var client = new Twitter(keys.twitterKeys);

  var params = { screen_name: "cnn" };
  client.get("statuses/user_timeline", params, function(error, tweets, response) {
    if (!error) {

      var data = [];

      for (var i = 0; i < tweets.length; i++) {
        data.push({
          created_at: tweets[i].created_at,
          text: tweets[i].text
        });
      }

      console.log(data);
      writeToLog(data);
    }
  });
};

// Function for running a command based on text file
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    }
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

  });
};

// Function for determining which command is executed
var pick = function(caseData, functionData) {
  switch (caseData) {
    case "tweet":
      getMyTweets();
      break;
	case "construct":
      getConstructor();
      break;
    case "do":
      doWhatItSays();
      break;
    default:
      console.log("hmmm - I do not recognize that");
  }
};


//////////////////////////////////////////////////////////////////////////
//////////////////// Register and Config Routes /////////////////////////
////////////////////////////////////////////////////////////////////////

const salesRoute =       express.Router();
const proofRoute =       express.Router();
const analyticRoute =    express.Router();

require('./routes/sales_route')(salesRoute);
require('./routes/proof_route')(proofRoute);
//require('./routes/analytic_route')(analyticRoute);

//////////////////////////////////////////////////////////////////////////
///////////////////////////// API CATALOGUE /////////////////////////////
////////////////////////////////////////////////////////////////////////

//app.use('/api', salesRoute)
app.use('/api', proofRoute)
//app.use('/api', analyticRoute);

/*
///////////////////////////////////////////////////////////////////////
/////////////////     ERROR HANDLING ROUTINES      ////////////////////
//////////////////////////////////////////////////////////////////////

app.use(logErrors)
app.use(errorHandler)

function logErrors (err, req, res, next) {
  console.log("log error triggered")
  console.error(err.message)
  console.error(err.stack)
  next(err)
}

function errorHandler (err, req, res, next) {
  console.log("error handler triggered")
  res.status(400)
  res.render('error', { error: err })
}
*/
///////////////////////////////////////////////////////////////////////
/////////////////Launch Server---  Connect Sockets ////////////////////
//////////////////////////////////////////////////////////////////////
httpServer.listen(port);

const io = socketIo(httpServer);

io.on('connection', function(socket) {
  console.log("someone just joined sockets")
})

app.set('socketio', io);


console.log("running on port " + port);
