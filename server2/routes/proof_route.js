'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////    Queue Message Route     /////////////////////////
////////////////////////////////////////////////////////////////////////

require( 'dotenv' ).config();
import bodyParser     from 'body-parser'
// Import the mainlone constructor file
import Charrette   from "../integrate/charrette.js";

// constructor
const getConstructor = function() {
	// creating and storing a new microservices conflict object
	let charrette = new Charrette({path: '/sales',
                                 text: 'experminetal process',
                                 source: 'sales',
                                 workreq: 'this is the workreq'});
	charrette.addEvent({path: '/sales',
                      text: 'experminetal process',
                      source: 'sales'});
	console.log(charrette);
}

// create an event queue
var q = require('async/queue')(function (task, callback) {
    console.log('hello ' + task.name);
    callback();
}, 2);

////////////////////////////////////////////////////////////
////////////////      proof bot  //////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {
  router.use(bodyParser.json());

	console.log("ENTERED PROOF")

  router.post('/sms', function(req, res, next) {

		// assign a callback
	  q.drain = function() {
	    console.log('all items have been processed');
	    return;
	  }
	  // add some items to the queue
	  q.push({name: 'foo'}, function (err) {
	    console.log('finished processing foo');
	  });
	  q.push({name: 'bar'}, function (err) {
	    console.log('finished processing bar');
	  });

   next();

 })
}
