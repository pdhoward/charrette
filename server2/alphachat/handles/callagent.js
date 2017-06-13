'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////


module.exports = callAgent;

function callAgent(workreq, cb) {

  console.log('----ENTERED Call Agent-----')

  workreq.newMsg.text = 'this is the updated message from call agent'
  console.log({workreq: workreq})

  cb(workreq)

  };
