'use strict';

///////////////////////////////////////////////////////////////////////
////////   connect to our document store and initialize //////////////
///////               Message and Dialogues             //////////////
//////////////////////////////////////////////////////////////////////

import mongoose                   from 'mongoose';
import startDialogue              from './initialize/startdialogue';

module.exports = function (dbURI) {
    mongoose.connect(dbURI);
    const db = mongoose.connection;

    db.on('error', function(error){
      console.log('Mongoose Error', error); })

    db.once('open', function callback() {
        startDialogue.isLive();
        console.log('MongoDB Connected');
    });
};
