
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatLine = {
  get: function(workreq, cb) {
    console.log('EXECUTING LINE HANDLER')
    console.log(workreq)
    cb(workreq)

  }
}

export const getformatLine = formatLine.get.bind(formatLine)
