// constructor function for creating event objects
const EventSource = function(api) {
  this.api = api;
  this.event = "Event Source";

};

// exporting our event constructor
module.exports = EventSource;
