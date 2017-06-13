
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatTwilio = {
  get: function(workreq, cb) {
    console.log('EXECUTING TWILIO HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}

export const getformatTwilio = formatTwilio.get.bind(formatTwilio)
