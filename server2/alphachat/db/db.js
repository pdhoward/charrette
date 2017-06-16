
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////

import level          from 'level';

const db = level('./alphachat/db/dbsession', { valueEncoding: 'json' })

/*
require('leveldown').destroy('./alphachat/db/dbsession', function (err) {
  if (err) {
    console,log('err destroying database ' + err)
  }
  console.log('session database initialized!')
})

if (db.isOpen()) {
  console.log("DB IS OPEN")
}
*/

const session = {
  put: function(key, data, cb) {
    let options = {
      sync: true
    }
    console.log('EXECUTING PUT DB')
    db.put(key, data, options, function (err) {
        if (err) return cb(err)
        cb(null);
      })
  },
  get: function(key, data, cb) {
    console.log('EXECUTING GET DB')
    console.log(key)
    db.get(key, function (err, value) {
      if (err) return cb(err)
      cb(null, value);
      })
  },
  del: function(key, cb) {
    console.log('EXECUTING DEL DB')
    db.del(key, function (err) {
        if (err) return console.log('WATCH OUT DEL!', err)
        cb('true');
      })
  }
}

export const putSession = session.put.bind(session)
export const getSession = session.get.bind(session)
export const delSession = session.del.bind(session)
