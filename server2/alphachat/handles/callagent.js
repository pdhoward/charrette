'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////


module.exports = callAgent;

function callAgent(workreq, cb) {

  console.log('----ENTERED Call Agent-----')
try {
  workreq.newMsg.text = 'this is the updated message from call agent'
  console.log({workreq: workreq})

  cb(null, workreq)

} catch(e) {
console.log('---error call Agent-----')
  if (e instanceof TypeError) {
      console.log('debug 1')
  } else if (e instanceof RangeError) {
      console.log('debug 2')
  } else if (e instanceof EvalError) {
      console.log('debug 3')
  } else {
      console.log('debug 4')
  }

}

  };
