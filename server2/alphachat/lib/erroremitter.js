

////////////////////////////////////////////////////////////////
/////                 AlphaChat                         ///////
////    Linking business with conversation markets     ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

// constructor for emitting errors
var util = require('util');
var EventEmitter =    require('events').EventEmitter

var ErrorEmitter = function() {

  var self = this;
  write function(data) {
    self.emit('data', data)
  }
}

util.inherits(ErrorEmitter, EventEmitter);
module.exports = ErrorEmitter
