'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////


module.exports = setState;

function setState(workreq, cb) {

  console.log('----ENTERED SetState-----')

  try {

  workreq.format.text = 'this is the updated message from set state'
  console.log({workreq: workreq})
  console.log(workreq.alpha.sessions)

  cb(null, workreq)

  } catch(e) {

    console.log('--error set state Agent-----')

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
