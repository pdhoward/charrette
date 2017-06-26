require('dotenv').config();
////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

import uuid               from 'uuid/v1';
import util               from 'util';
import AlphaClient        from './config/alphaclient.js';
import AlphaAgent         from './config/alphaagent.js';
import AlphaPlatform      from './config/alphaplatform.js';
import formatUI           from './integration/ui';
import callAgent          from './handles/callagent.js';
import findAgent          from './handles/findagent';
import recordResult       from './handles/recordresult.js';
import setState           from './handles/setstate.js';
import errorMessage       from './messages/errorcodes.js';
import EventSource        from './lib/eventsource.js';
import EventEmitter       from 'events';
import Message            from './db/models/Message.js'

const NEW_SESSION =     'New Session';
const ACTIVE_SESSION =  'Active Session';
const END_SESSION =     'End Session';

////////////////////////////////////////////////////////////////
////// Configure Data Store for Capturing Conversations  //////
//////////////////////////////////////////////////////////////

const dbURI =  process.env.MONGO_URI;
require('./db/mongoose')(dbURI);

// private
let n = 0;

//public
module.exports = AlphaChat;

// constructor function for 'straight through' execution of microservices
function AlphaChat (args) {

  this.channel = args.channel;

  this.newreq = {}
  this.newreq = Object.assign({}, args.message)   // message = req object

  this.db = 'local'          // default
  if (args.db) {
     this.db = args.db }

  this._entryPoint = false
  if (args.entry) {
     this._entryPoint = true
     this.entry = args.entry }

  this._activeSession = false;
  this._endSession = false;
  this._callback = false;
  this._redirect = false;
  this._messagesProcessed = n++;
  this._sessionID = uuid();

};

////////////////////////////////////////
// listeners for errors detected    ///
//////////////////////////////////////
util.inherits(AlphaChat, EventEmitter)

AlphaChat.prototype.throwError = function(err) {
  console.log("EMITTING ERROR")
  this.emit('error', err)
}

AlphaChat.prototype.catchError = function() {
  console.log("LISTENING FOR ERRORS")
  this.on('error', function(data) {
    console.log('ERROR DETECTED')
    console.log(data)
  })
}

////////////////////////////////////////
//        mainline process          ///
//////////////////////////////////////

AlphaChat.prototype.processMessage = function(cb) {

    // open an event listener for errors
    this.catchError();

    // process for unhandledrejection event

    process.on('unhandledRejection', error => {
        console.log('unhandledRejection', error.message);
      });

    // Test for entry point. Service name required to get started
    if (!this._entryPoint) {
     this.throwError(errorMessage['1021']);
     return
    }

    /////////////////////////////////////////////
    // workreq: execution obj for session     //
    // .body - http message  (newreq)        //
    // .alpha - platform data               //
    // .format - managed by UI handler     //
    ////////////////////////////////////////

    let workreq = {}

    workreq = Object.assign({}, this.newreq)

    workreq.alpha = {}
    workreq.alpha.channel =       this.channel;
    workreq.alpha.db =            this.db;
    workreq.alpha.count =         this._messagesProcessed;
    workreq.alpha.entry =         this.entry;
    workreq.alpha.activeSession = this._activeSession;
    workreq.alpha.context = {};
    workreq.alpha.sessionID =     this._sessionID;
    workreq.alpha.sessions = [] ;
    workreq.alpha.sessions.push({sessionID: this._sessionID})

    // record to MongoDB
    let newMessage = new Message({message: this.newreq.body, channel: this.channel});
    newMessage.save(function (err, response) {
      if (err) {
          console.log("Error When Saving Text Message", err)
          return err;
        }
      console.log("Message Saved")
    })

    // stages of transformation

    function Stage_100_Map(obj) {
      return new Promise((resolve, reject) => {
        formatUI(obj, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    function Stage_200_State(obj) {
      return new Promise((resolve, reject) => {
        setState(obj, function(err, response) {
          if(err) return reject(err);
          resolve(response)
        })
      })
    }

    function Stage_300_Agent(obj) {
      return new Promise((resolve, reject) => {
        findAgent(obj, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    function Stage_400_Call(obj) {
      return new Promise((resolve, reject) => {
        callAgent(obj, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    function Stage_500_Record(obj) {
      return new Promise((resolve, reject) => {
        recordResult(obj, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    // workreq passed through each stage to transform incoming message and
    // create a response

    async function message(workreq) {
      let stage100 = await Stage_100_Map(workreq)
      let stage200 = await Stage_200_State(stage100)
      let stage300 = await Stage_300_Agent(stage200)
      let stage400 = await Stage_400_Call(stage300)
      let stage500 = await Stage_500_Record(stage400)

      return stage500

    }

    message(workreq).then(function(data) {
      console.log('---ALPHACHAT COMPLETED----')
      console.log({data: data})
      return cb(data)
    })

}




////////////////////////////////////////
//        event sourcing            ///
//////////////////////////////////////

AlphaChat.prototype.addEvent = function(api) {
  this.events.push(new EventSource(api));
  this.numEvents = this.events.length;
  console.log(this.events)
}

AlphaChat.prototype.toggleSession = function() {
  this._newSession = !this._newSession;
}

AlphaChat.prototype.sessionState = function() {
  if (this._newSession)    return NEW_SESSION;
  if (this._endSession)    return END_SESSION;
  if (this._activeSession) return ACTIVE_SESSION;
};

// Configure the client, agent and platform objects used to call services
AlphaChat.prototype.configure = function(arry) {

  let x = arry.length;
  let isAgent = false;
  let isPlatform = false;

  if (x == 0) {
   this.throwError(errorMessage['1001']);
   return
  }

  arry.map(function(x){
    if (x.name == "agents") {
      let alphaAgent = new AlphaAgent;
      isAgent = true;
      alphaAgent.configure(x.data);
    }
    if (x.name == "platforms") {
      let alphaPlatform = new AlphaPlatform;
      isPlatform = true;
      alphaPlatform.configure(x.data);
    }
  })

  if (isAgent && isPlatform) {
    return
  } else {
    this.throwError(errorMessage['1011']);
    return
  }

}

AlphaChat.prototype.configureAgents = function(obj) {

}

AlphaChat.prototype.configurePlatforms = function(obj) {

}

AlphaChat.prototype.recordSession = function(data) {

}

AlphaChat.prototype.newSession = function() {

}

AlphaChat.prototype.activeSession = function() {

}

AlphaChat.prototype.endSession = function() {

}

AlphaChat.prototype.formatMessage = function() {

}
