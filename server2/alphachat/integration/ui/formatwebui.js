
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatWebUI = {
  get: function(workreq, cb) {
    console.log('EXECUTING WEB UI HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}

export const getformatWebUI = formatWebUI.get.bind(formatWebUI)
