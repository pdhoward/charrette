'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////    Queue Message Route     /////////////////////////
////////////////////////////////////////////////////////////////////////

require( 'dotenv' ).config();
import bodyParser         from 'body-parser';

import AlphaChat          from "../alphachat/alphachat.js";
import agentObjects       from "../config/agents.js"
import platformObjects    from "../config/platforms.js"

// create an event queue
var q = require('async/queue')(function (alphaChat, callback) {
		alphaChat.processMessage(function(response){
			console.log('-------SMS QUEUE COMPLETED ----------')
			console.log(response)
			return callback();
		})
}, 2);

////////////////////////////////////////////////////////////
////////////////   sms message route  /////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {
  router.use(bodyParser.json());
  router.post('/sms', function(req, res, next) {


		///////////////////////////////////////////
		/////////   SPOOF FOR TESTING ////////////
		/////////    MOCK TWILIO FORMAT //////////
		//////////////////////////////////////////
		req.body = {}
		req.body.From = '9145005391';
		req.body.TO = '9148008888'
		req.body.Body = "I am an original text message from twilio"
		req.body.orgMsg = "Place Holder"

		// construct alpha object for managing interactions
		// parameters to include > channel: twiliosms, storage: db,

		let alphaChat = new AlphaChat ( {db: 'local',
																		 entry: 'echo',
																	   channel: 'twiliosms',
																	 	 message: req} );

		// configure the alpha object
		alphaChat.configure([ { name: 'agents',
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
