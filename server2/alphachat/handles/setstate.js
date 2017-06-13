'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////


module.exports = setState;

function setState(workreq, cb) {

  console.log('----ENTERED SetState-----')

  workreq.newMsg.text = 'this is the updated message from set state'
  console.log({workreq: workreq})

  cb(workreq)

  };
