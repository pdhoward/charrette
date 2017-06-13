'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////    Queue Message Route     /////////////////////////
////////////////////////////////////////////////////////////////////////

require( 'dotenv' ).config();
import bodyParser         from 'body-parser';

import AlphaChat          from "../alphachat/alphachat.js";
import clientObjects      from "../config/clients.js"
import agentObjects       from "../config/agents.js"
import platformObjects    from "../config/platforms.js"

// create an event queue
var q = require('async/queue')(function (alphaChat, callback) {
		let response = alphaChat.processMessage({text: 'original message', from: '9145005391', to: '9148002121'})
		console.log('-------SMS ROUTE COMPLETED ----------')
		console.log({response: response})
		callback();
}, 2);

////////////////////////////////////////////////////////////
////////////////   sms message route  /////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {
  router.use(bodyParser.json());
  router.post('/sms', function(req, res, next) {

		// construct alpha object for managing interactions
		// parameters to include > channel: twiliosms, storage: db,

		let alphaChat = new AlphaChat ({channel: 'twiliosms',
																		 db: null});

		// configure the alpha object
		alphaChat.configure([ { name: 'clients',
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
	  q.push(alphaChat, function (err) {
	    console.log('finished processing a session');
	  });

		res.setHeader('Content-Type', 'text/xml')
    res.status(200).send({ text: "chaoticbots rule" });

		var io = req.app.get('socketio');
    io.emit('message');

   next();

 })
}
