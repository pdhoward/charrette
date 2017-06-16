'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

import { getSession, putSession, delSession } from '../db/db.js'

module.exports = setState;

function setState(workreq, cb) {

  console.log('----ENTERED SET STATE-----')

  try {
    // pulse the session database to determine if this is active dialogue

    let parm = workreq.format.sender + workreq.format.receiver
    let oldreq = Object.assign({}, workreq)
    console.log("STEP 1")
    console.log({parm: parm})
    console.log({oldreq: oldreq})

    getSession(parm, oldreq, function(err, value) {
      if (err) {
        if (err.notFound) {

          // session is new. Record oldreq, pass back
          oldreq.alpha.newSession = 'true'
          oldreq.alpha.activeSession = 'false'
          putSession(parm, oldreq, function(err) {
              if (err) return cb(err)

              console.log({workreq: oldreq})
              cb(null, oldreq)
            })
          }
          // some other kind of an IO error
          return cb(err)
        }

      // found the state object - session is active
      let newreq = Object.assign({}, value)
      newreq.alpha.newSession = 'false'
      newreq.alpha.activeSession = 'true'
      console.log({workreq: newreq})
      cb(null, newreq)
    })

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
