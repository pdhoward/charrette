'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////


module.exports = findAgent;

function findAgent(workreq, cb) {

  console.log('----ENTERED find agent-----')

  workreq.newMsg.text = 'this is the updated message from find agent'
  console.log({workreq: workreq})

  cb(workreq)

  };
