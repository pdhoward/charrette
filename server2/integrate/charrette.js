
const EventSource = require("./eventsource.js");

// constructor function for 'straight through' execution of microservices
const Charrette = function(workreq) {
  this.events = [];
  this.numEvents = 0;
  this.workreq = workreq;
  this.message = "Successful Execution of the Charrette";
  console.log(this.message)
  // a method that creates a student using our Student constructor.
  // It then pushes the new student object to this.students and updates this.numStudents
  this.addEvent = function(api) {
    this.events.push(new EventSource(api));
    this.numEvents = this.events.length;
    console.log(this.events)
  };
};

module.exports = Charrette
