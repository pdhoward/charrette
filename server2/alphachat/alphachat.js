
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
  if (args) {
  this.db = args.db }
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

    let Stage_100_Map = new Promise((resolve, reject) => {
      formatUI(workreq, function(response) {
        resolve(response)
      })
    })

    let Stage_200_State = new Promise((resolve, reject) => {
      setState(workreq, function(response) {
        resolve(response)
      })
    })

    let Stage_300_Agent = new Promise((resolve, reject) => {
      findAgent(workreq, function(response) {
        resolve(response)
      })
    })

    let Stage_400_Call = new Promise((resolve, reject) => {
      callAgent(workreq, function(response) {
        resolve(response)
      })
    })

    let Stage_500_Record = new Promise((resolve, reject) => {
      recordResult(workreq, function(response) {
        resolve(response)
      })
    })

    async function message() {

      await Stage_100_Map.then((response) => {
        console.log('------------')
        console.log('stage 100 map')
        console.log(response)
        //return cb(response)
      })
      await Stage_200_State.then((response) => {
        console.log('------------')
        console.log('stage 200 state')
        console.log(response)
        //return cb(response)
      })
      await Stage_300_Agent.then((response) => {
        console.log('------------')
        console.log('stage 300 agent')
        console.log(response)
      //  return cb(response)
      })
      await Stage_400_Call.then((response) => {
        console.log('------------')
        console.log('stage 400 call')
        console.log(response)
      //  return cb(response)
      })
      await Stage_500_Record.then((response) => {
        console.log('------------')
        console.log('stage 500 record')
        console.log(response)
        return cb(response)
      })
    }

    message()


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
