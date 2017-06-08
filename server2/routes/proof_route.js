'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////    Queue Message Route     /////////////////////////
////////////////////////////////////////////////////////////////////////

require( 'dotenv' ).config();
import bodyParser       from 'body-parser';
import HyperMarket      from "../integrate/hypermarket.js";
import clientObjects    from "../config/clients.js"


// create an event queue
var q = require('async/queue')(function (hyper, callback) {
		console.log('------------------------------')
    console.log(hyper);
		hyper.executeSession({text: 'update'});
    callback();
}, 2);

////////////////////////////////////////////////////////////
////////////////      proof bot  //////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {
  router.use(bodyParser.json());
  router.post('/sms', function(req, res, next) {
		console.log('PROOF API Route');

		let hyper = new HyperMarket ({path: '/sales',
	                                text: 'experimental process',
	                                source: 'sales',
	                                workreq: 'this is the workreq'});
		hyper.configureClients(clientObjects)
		// assign a callback
	  q.drain = function() {
	    console.log('all items have been processed');
	    return;
	  }
	  // add some items to the queue
	  q.push(hyper, function (err) {
	    console.log('finished processing a hypersession');
	  });

		res.setHeader('Content-Type', 'text/xml')
    res.status(200).send({ text: "chaoticbots rule" });

		var io = req.app.get('socketio');
    io.emit('message');

   next();

 })
}
