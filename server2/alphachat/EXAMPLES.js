
/////////////////////////////
// MORE EXAMPLES

async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}

///// object storage
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars');
    return cache.match(`/avatars/${name}.jpg`);
  }
};

storage.getAvatar('jaffathecake').then(…);

////// over req object to track outgoing messages

// override http(s) outgoing connections to track with botMetrics
// using the req object to simplify metrics collections on backend
const originalRequest = http.request;
http.request = function wrapMethodRequest(req) {
  if (req.body) {
    if (req.host === 'graph.facebook.com') {
      try {
        const body = JSON.parse(req.body);
        if (body.recipient && body.recipient.id && body.sender_action !== 'typing_on') {
          // do not track 'typing' messages
          botMetrics.track({
            text: body,
            message_type: 'outgoing',
            user_id: body.recipient.id,
            platform: 'Messenger',
          });
        }
      } catch (error) {
        console.log('wrapMethodRequest:facebook: no body to parse');
      }
    } else if (req.host === 'api.telegram.org') {
      const body = url.parse(`?${req.body}`, true).query;
      if (body.chat_id) {
        botMetrics.track({
          text: body,
          message_type: 'outgoing',
          user_id: body.chat_id,
          platform: 'Telegram',
        });
      }
    } else if (req.host === 'api.kik.com') {
      const body = JSON.parse(req.body);
      if (body.messages) {
        body.messages.forEach((message) => {
          if (message.to && message.type !== 'is-typing') {
            // do not track 'typing' messages
            botMetrics.track({
              text: message,
              message_type: 'outgoing',
              user_id: message.to,
              platform: 'Kik',
            });
          }
        });
      }
    } else {
      // console.warn('non-tracking host', { req });
    }
  }
  // call the original 'request' function
  return originalRequest.apply(this, arguments);
};


//   test to see existance of a config file
/* eslint global-require: 0 import/no-unresolved:0 */

const fs = require('fs');
const path = require('path');

const fileExist = fs.existsSync(path.resolve(__dirname, 'configuration.json'));

if (fileExist) {
    module.exports = require('./configuration.json');
} else {
    module.exports = require('./configuration_template.json');
}

/*  configuration_template.json
{
    "GA_Tracking_ID": "UA-000000-0",
    "GA_Enabled": false,
    "DB_Use_Mongo" : false,
    "DB_Mongo_URL": "mongodb://localhost/retrospected",
    "Use_Anti_Spam": false
}

// configuration.json

{
    "GA_Tracking_ID": "UA-000000-0",
    "GA_Enabled": false,
    "DB_Use_Mongo" : true,
    "DB_Mongo_URL": "mongodb://xio:chaotic@ds147777.mlab.com:47777/chaoticchatter",
    "Use_Anti_Spam": false,
    "PUB_KEY": "pub-c-fd7baf82-35ee-4889-9a36-560d0681eee6",
    "SUB_KEY": "sub-c-78144356-ac3b-11e6-a7bb-0619f8945a4f",
    "PUB_SECRET": "sec-c-NzNhZTYwYTQtYjI2OC00YzliLWExZjQtMmQwMDc0YmZjMTQx"
}
*/

// examples of using leveldb

  console.log('----ENTERED SetState-----')
  let key = 'nextname4'
  let data = {
      value: 'this is the NEW NEW VALUES'
    }
  key = 'nextname40'
  putSession(key, data, function(){
    console.log('PUT SESSION SUCCESS')
  })
  key = 'nextname41'
  putSession(key, data, function(){
    console.log('PUT SESSION SUCCESS')
  })
  key = 'nextname42'
  putSession(key, data, function(){
    console.log('PUT SESSION SUCCESS')
  })

  key = 'nextname14'
  getSession(key, function(){
    console.log('Get SESSION SUCCESS')
  })

  key = 'nextname22'

  delSession(key, function(){
    console.log('DEL SESSION SUCCESS')
  })

////////////////////////////////////////////////////////////////////////////
//   this could be a microservice --- getting info and recording to mongo
////////////////////////////////////////////////////////////////////////////

/* Scraping into DB (18.2.5)
 * ========================== */

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");


// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});


// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as a json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of ycombinator
  request("https://news.ycombinator.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".title").each(function(i, element) {
      // Save the text of each link enclosed in the current element
      var title = $(this).children("a").text();
      // Save the href value of each link enclosed in the current element
      var link = $(this).children("a").attr("href");

      // If this title element had both a title and a link
      if (title && link) {
        // Save the data in the scrapedData db
        db.scrapedData.save({
          title: title,
          link: link
        },
        function(error, saved) {
          // If there's an error during this query
          if (error) {
            // Log the error
            console.log(error);
          }
          // Otherwise,
          else {
            // Log the saved data
            console.log(saved);
          }
        });
      }
    });
  });

  // This will send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
