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


	console.log(charrette);
}

// create an event queue
var q = require('async/queue')(function (task, callback) {
		console.log('------------------------------')
    console.log(task);
		task.addEvent({newevent: '/proof5',
	                 text: 'new process5'});
		task.addEvent({newevent: '/proof4',
	                 text: 'new process4'});
		task.addEvent({newevent: '/proof3',
	                 text: 'new process3'});
		task.addEvent({newevent: '/proof',
	                 text: 'new process'});
		task.addEvent({newevent: '/proof2',
							 	   text: 'new process2'});
    callback();
}, 2);

////////////////////////////////////////////////////////////
////////////////      proof bot  //////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {
  router.use(bodyParser.json());
  router.post('/sms', function(req, res, next) {

		console.log('PROOF API Route');

		let charrette = new Charrette({path: '/sales',
	                                 text: 'experminetal process',
	                                 source: 'sales',
	                                 workreq: 'this is the workreq'});

		// assign a callback
	  q.drain = function() {
	    console.log('all items have been processed');
	    return;
	  }
	  // add some items to the queue
	  q.push(charrette, function (err) {
	    console.log('finished processing CHARRETTE');
	  });
	  q.push({name: 'bar', addEvent: function() {console.log("BAR EVENT ADDED")}}, function (err) {
	    console.log('finished processing bar');
	  });

   next();

 })
}
