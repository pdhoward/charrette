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

    let parm = {
      sender: workreq.format.sender,
      receiver: workreq.format.receiver
    }

    let oldreq = Object.assign({}, workreq)
    console.log("DEBUG")
    console.log(oldreq)

    getSession(parm, oldreq, function(err, value) {
      if (err) {
        if (err.notFound) {

          // session is new. Store workreq and pass back
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
      // found the state object - session is active.
      let newreq = Object.assign({}, oldreq)      
      newreq.alpha.activeSession = 'true'
      // restore the context that was recorded in db session
      newreq.alpha.context = value.alpha.context
      // restore session array and update with sessionId from incoming req message
      newreq.alpha.sessions = value.alpha.sessions.concat(oldreq.alpha.sessions)

      console.log({workreq: newreq})
      console.log('sessions array')
      console.log(newreq.alpha.sessions)
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
