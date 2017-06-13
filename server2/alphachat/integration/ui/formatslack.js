
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatSlack = {
  get: function(workreq, cb) {
    console.log('EXECUTING SLACK HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}


export const getformatSlack = formatSlack.get.bind(formatSlack)
