

////////////////////////////////////////////////////////////////
/////                 AlphaChat                         ///////
////    Linking business with conversation markets     ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

// constructor for emitting errors

var EventEmitter =    require('events').EventEmitter

class ErrorEmitter extends EventEmitter {
  constructor() {
    super()
  }
  write(data) {
    this.emit('data', data)
  }
}

module.exports = ErrorEmitter
