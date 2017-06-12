
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatTwilioSMS = {
  get: function(workreq, cb) {
    console.log('EXECUTING TWILIO SMS HANDLER')
    console.log(workreq)
    cb(workreq);

  }
}

export const getformatTwilioSMS = formatTwilioSMS.get.bind(formatTwilioSMS)
