'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

import { getSession, putSession, delSession } from '../db/db.js'

module.exports = setState;

function setState(workreq, cb) {

  console.log('----ENTERED SetState-----')
  let key = 'nextname4'
  let data = {
      value: 'this is the NEW NEW VALUES'
    }
  key = 'nextname40'
  putSession(key, data, function(){
    console.log('PUT SESSION SUCCESS')
  })
  key = 'nextname41'
  putSession(key, data, function(){
    console.log('PUT SESSION SUCCESS')
  })
  key = 'nextname42'
  putSession(key, data, function(){
    console.log('PUT SESSION SUCCESS')
  })

  key = 'nextname14'
  getSession(key, function(){
    console.log('Get SESSION SUCCESS')
  })

  key = 'nextname22'

  delSession(key, function(){
    console.log('DEL SESSION SUCCESS')
  })


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
