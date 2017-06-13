
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatFacebook = {
  get: function(workreq, cb) {
    console.log('EXECUTING FACEBOOK HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}

export const getformatFacebook = formatFacebook.get.bind(formatFacebook)
