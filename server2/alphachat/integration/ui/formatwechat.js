
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatWeChat = {
  get: function(workreq, cb) {
    console.log('EXECUTING WECHAT HANDLER')
    console.log(workreq)
    return

  }
}

export const getformatWeChat = formatWeChat.get.bind(formatWeChat)
