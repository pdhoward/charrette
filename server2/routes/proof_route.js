'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////    Queue Message Route     /////////////////////////
////////////////////////////////////////////////////////////////////////

require( 'dotenv' ).config();
import bodyParser       from 'body-parser';
import AlphaChat      from "../integrate/AlphaChat.js";
import clientObjects    from "../config/clients.js"


// create an event queue
var q = require('async/queue')(function (alpha, callback) {
		console.log('------------------------------')
    console.log(alpha);
		alpha.executeSession({text: 'update'});
    callback();
}, 2);

////////////////////////////////////////////////////////////
////////////////      proof bot  //////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {
  router.use(bodyParser.json());
  router.post('/sms', function(req, res, next) {
		console.log('PROOF API Route');

		let alpha = new AlphaChat ({path: '/sales',
	                                text: 'experimental process',
	                                source: 'sales',
	                                workreq: 'this is the workreq'});
		alpha.configureClients(clientObjects)
		// assign a callback
	  q.drain = function() {
	    console.log('all items have been processed');
	    return;
	  }
	  // add some items to the queue
	  q.push(alpha, function (err) {
	    console.log('finished processing a alphasession');
	  });

		res.setHeader('Content-Type', 'text/xml')
    res.status(200).send({ text: "chaoticbots rule" });

		var io = req.app.get('socketio');
    io.emit('message');

   next();

 })
}
