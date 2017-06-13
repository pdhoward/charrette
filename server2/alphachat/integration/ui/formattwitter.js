
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatTwitter = {
  get: function(workreq, cb) {
    console.log('EXECUTING TWITTER SMS HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}

export const getformatTwitter = formatTwitter.get.bind(formatTwitter)
