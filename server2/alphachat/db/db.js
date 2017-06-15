'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////



// persistent local storage for tracking sessions
import Loki       from 'lokijs';

let options = {
  env: 'NODEJS',
  autosave: true
}
const db = new Loki('example.db', options)
/*
db.saveDatabase(function(err) {
  if (err) {
    console.log("error : " + err);
  }
  else {
    console.log("database saved.");
  }
});
*/
const collection = db.addCollection('users')

//const collection = db.getCollection('users')


const Session = {

  create: function(dbase, cb){
    console.log('created db ' + dbase)
    cb('true')
  },

  add: function(obj, cb) {
    console.log('added a collection ' + obj)
    cb('true')
  },

  insert: function(obj, cb) {
    console.log('inserted a document' + obj)
    collection.insert(obj)
    cb('true')
  },

  query: function(parm, cb) {
    console.log('find a document' + parm)
    let results = collection.find(parm)
    console.log(JSON.stringify(results))
    cb('true')
  },
  delete: function(parm, cb) {
    //findandremove
    console.log('delete a document ' + parm)
    cb('true')
  }


}

export const createSession =    Session.create.bind(Session)
export const addSession =       Session.add.bind(Session)
export const insertSession =    Session.insert.bind(Session)
export const querySession =     Session.query.bind(Session)
export const deleteSession =    Session.delete.bind(Session)
