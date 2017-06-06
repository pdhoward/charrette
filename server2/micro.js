// Spoof on microservices
// testing constructors and and a framework for charrette
// =====================================

import express        from 'express';
import path           from 'path';
import bodyParser     from 'body-parser'
import cors           from 'cors';
import favicon        from 'serve-favicon';
import http           from 'http';
import setup          from './config/setup';
import secrets        from './config/secrets'


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

// Import the mainlone constructor file
var Classroom = require("./integrate/classroom.js");

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

var getConstructor = function() {
	// creating and storing a new classroom object
	var firstClass = new Classroom("Ahmed", 3187);

	// calling the addStudent method on our firstClass object
	firstClass.addStudent("Jacob", "Coding", 3.87);

	console.log(firstClass);
}

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
      console.log("LIRI doesn't know that");
  }
};

// Function which takes in command line arguments and executes correct function accordigly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv[3]);


///////////////////////////////////////////////////////////////////////
/////////////////Launch Server---  Connect Sockets ////////////////////
//////////////////////////////////////////////////////////////////////
httpServer.listen(port);


console.log("running on port " + port);
