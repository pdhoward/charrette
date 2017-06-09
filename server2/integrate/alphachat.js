

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

import uuid               from 'uuid/v1';
import EventSource        from './eventsource.js';
import AlphaClient        from './config/alphaclient.js';
import AlphaAgent         from './config/alphaagent.js';
import AlphaPlatform      from './config/alphaplatform.js';

const NEW_SESSION =     'New Session';
const ACTIVE_SESSION =  'Active Session';
const END_SESSION =     'End Session';

// private
let n = 0;
let err = '';


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
  this.message = "Successful Execution AlphaChat";
  console.log(this.message)
};

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
  let isClient = false;
  let isAgent = false;
  let isPlatform = false;
  if (x == 0) {
    err = new Error('1001: No configuration objects detected (.configure)')
    return err
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
    err = new Error('1011: Missing mandatory configuration object (.configure agents or platforms)')
    return err
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
