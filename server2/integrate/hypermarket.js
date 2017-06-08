
const EventSource = require("./eventsource.js");

module.exports = HyperMarket

// constructor function for 'straight through' execution of microservices
function HyperMarket (workreq) {
  this.events = [];
  this.numEvents = 0;
  this.workreq = workreq;
  this.message = "Successful Execution of the Charrette";
  console.log(this.message)
};

HyperMarket.prototype.addEvent = function(api) {
  this.events.push(new EventSource(api));
  this.numEvents = this.events.length;
  console.log(this.events)
}
