
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////

import formatTwilioSMS from './test';
export const getformatTwilioSMS = formatTwilioSMS.get.bind(formatTwilioSMS)

/*
const formatTwilioSMS = {
  get: function(workreq, cb) {
    console.log('EXECUTING TWILIO SMS HANDLER')
    console.log(workreq)
    return workreq;

  }
}
*/
