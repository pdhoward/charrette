'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

import {createSession, addSession, insertSession,
        querySession, deleteSession}                from '../db/db.js'


module.exports = setState;

function setState(workreq, cb) {

  console.log('----ENTERED SetState-----')

  let obj = {note: 'this is a session test'}

  console.log('TESTING SESSION FUNCTIONS')
  createSession(obj, function() {
    console.log('it worked')
  })
  addSession(obj, function() {
    console.log('it worked')
  })

  let insertObj = {
    name: 'Odin Again',
    age: 50,
    address: 'Asgard'
  }

  insertSession(insertObj, function() {
    console.log('it worked')
  })

  insertObj.name = "very cool already"
  insertSession(insertObj, function() {
    console.log('it worked 2')
  })

  insertObj.name = "cool very"
  insertSession(insertObj, function() {
    console.log('it worked 3')
  })

  let parm = {name: 'Odin'}
  querySession(obj, function() {
    console.log('it worked1 ')
  })

  parm.name = 'very cool'
  querySession(obj, function() {
    console.log('it worked 2')
  })
  
  deleteSession(obj, function() {
    console.log('it worked')
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
