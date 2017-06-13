'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////


module.exports = recordResult;

function recordResult(workreq, cb) {

    console.log('----ENTERED Record Agent-----')

    workreq.newMsg.text = 'this is the updated message from record agent'
    console.log({workreq: workreq})

    cb(workreq)

  };
