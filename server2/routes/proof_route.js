'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////    Queue Message Route     /////////////////////////
////////////////////////////////////////////////////////////////////////

require( 'dotenv' ).config();
import bodyParser         from 'body-parser';
import AlphaChat          from "../integrate/AlphaChat.js";
import clientObjects      from "../config/clients.js"
import agentObjects       from "../config/agents.js"
import platformObjects    from "../config/platforms.js"

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

		// construct alpha object for managing interactions

		let alpha = new AlphaChat ({path: '/sales',
	                                text: 'experimental process',
	                                source: 'sales',
	                                workreq: 'this is the workreq'});		

		// configure the alpha object
		alpha.configure([ { name: 'clients',
		 										data: clientObjects },
											{ name: 'agents',
											  data: agentObjects },
											{ name: 'platforms',
												data: platformObjects } ])

		// assign a callback on the work queue
	  q.drain = function() {
	    console.log('all items have been processed');
	    return;
	  }

	  // push the alpha object to the qeueu for execution
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
