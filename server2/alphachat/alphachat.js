
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


const NEW_SESSION =     'New Session';
const ACTIVE_SESSION =  'Active Session';
const END_SESSION =     'End Session';

// private
let n = 0;


//public
module.exports = AlphaChat;

// constructor function for 'straight through' execution of microservices
function AlphaChat (args) {
  this.channel = '';
  this.db = 'local'
  this.entry = 'echo'
  if (args.db) {
  this.db = args.db }
  if (args.entry) {
  this.echo = args.entry }
  this._messagesProcessed = n++;
  this._newSession = false;
  this._activeSession = false;
  this._endSession = false;
  this._callback = false;
  this._redirect = false;
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

AlphaChat.prototype.processMessage = function(data, cb) {

    // open an event listener for errors
    this.catchError();

    let workreq = {};
    workreq.channel = data.channel;
    workreq.db =      this.db
    workreq.orgMsg =  data
    workreq.orgMsg.messagesProcessed = this._messagesProcessed;

    function Stage_100_Map(workreq) {
      return new Promise((resolve, reject) => {
        formatUI(workreq, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    function Stage_200_State(workreq) {
      return new Promise((resolve, reject) => {
        setState(workreq, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    function Stage_300_Agent(workreq) {
      return new Promise((resolve, reject) => {
        findAgent(workreq, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    function Stage_400_Call(workreq) {
      return new Promise((resolve, reject) => {
        callAgent(workreq, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    function Stage_500_Record(workreq) {
      return new Promise((resolve, reject) => {
        recordResult(workreq, function(err, response) {
          if(err) return reject(err)
          resolve(response)
        })
      })
    }

    async function message() {
      return {
        result1: await Stage_100_Map(workreq),
        result2: await Stage_200_State(workreq),
        result3: await Stage_300_Agent(workreq),
        result4: await Stage_400_Call(workreq),
        result5: await Stage_500_Record(workreq)
      }
    }

    message().then(function(data) {
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
