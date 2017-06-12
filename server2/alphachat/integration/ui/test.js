'use strict';



module.exports = {
  get: function(workreq, cb) {
    console.log('EXECUTING TWILIO SMS HANDLER')
    console.log(workreq)
    return workreq;

  }
}
