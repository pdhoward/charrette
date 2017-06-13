
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatAlexa = {
  get: function(workreq, cb) {
    console.log('EXECUTING ALEXA HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}


export const getformatAlexa = formatAlexa.get.bind(formatAlexa)
