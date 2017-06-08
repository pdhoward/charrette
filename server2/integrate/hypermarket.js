

////////////////////////////////////////////////////////////////
/////                 hypermarket                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

import uuid             from 'uuid/v1';
import EventSource      from './eventsource.js';

const NEW_SESSION =     'New Session';
const ACTIVE_SESSION =  'Active Session';
const END_SESSION =     'End Session';

let n = 0;

module.exports = HyperMarket;

// constructor function for 'straight through' execution of microservices
function HyperMarket (workreq) {
  this.workreq = workreq;
  this._count = n++;
  this._newSession = false;
  this._activeSession = false;
  this._endSession = false;
  this._callback = false;
  this._redirect = false;
  this._sessionID = uuid();
  this.message = "Successful Execution Hypermarket";
  console.log(this.message)
};

HyperMarket.prototype.addEvent = function(api) {
  this.events.push(new EventSource(api));
  this.numEvents = this.events.length;
  console.log(this.events)
}

HyperMarket.prototype.toggleSession = function() {
  this._newSession = !this._newSession;
}

HyperMarket.prototype.sessionState = function() {
  if (this._newSession)    return NEW_SESSION;
  if (this._endSession)    return END_SESSION;
  if (this._activeSession) return ACTIVE_SESSION;
};

HyperMarket.prototype.recordSession = function(data) {
  this.workreq = Object.assign(this.workreq, data);
  console.log("Hyper Session Recorded")
  console.log(this.workreq)

}

HyperMarket.prototype.newSession = function() {

}

HyperMarket.prototype.activeSession = function() {

}

HyperMarket.prototype.endSession = function() {

}

HyperMarket.prototype.formatMessage = function() {

}

HyperMarket.prototype.executeSession = function(data) {
  this.recordSession(data)

}
