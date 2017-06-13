
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatSiri = {
  get: function(workreq, cb) {
    console.log('EXECUTING SIRI HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}

export const getformatSiri = formatSiri.get.bind(formatSiri)
