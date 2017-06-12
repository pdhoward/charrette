
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
import errorMessage       from './messages/errorcodes.js';
import EventSource        from './lib/eventsource.js';
// import ErrorEmitter       from './lib/erroremitter.js';
import EventEmitter       from 'events';

const NEW_SESSION =     'New Session';
const ACTIVE_SESSION =  'Active Session';
const END_SESSION =     'End Session';

// private
let n = 0;


//public
module.exports = AlphaChat;

// constructor function for 'straight through' execution of microservices
function AlphaChat (workreq) {
  this.workreq = workreq;
  this._count = n++;
  this._newSession = false;
  this._activeSession = false;
  this._endSession = false;
  this._callback = false;
  this._redirect = false;
  this._sessionID = uuid();
};

//  TEST
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

  // open an event listener for errors
  this.catchError();

  let x = arry.length;
  let isClient = false;
  let isAgent = false;
  let isPlatform = false;

  if (x == 0) {
   this.throwError(errorMessage['1001']);
   return
  }

  arry.map(function(x){
    if (x.name == "clients") {
      let alphaClient = new AlphaClient;
      isClient = true;
      alphaClient.configure(x.data);
    }
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
  this.workreq = Object.assign(this.workreq, data);
  console.log("Hyper Session Recorded")
  console.log(this.workreq)

}

AlphaChat.prototype.newSession = function() {

}

AlphaChat.prototype.activeSession = function() {

}

AlphaChat.prototype.endSession = function() {

}

AlphaChat.prototype.formatMessage = function() {

}

AlphaChat.prototype.executeSession = function(data) {
  this.recordSession(data)

}
