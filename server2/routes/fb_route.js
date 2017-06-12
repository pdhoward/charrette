'use strict';
//////////////////////////////////////////////////////////////////////////
////////////////////Primary Main Message Route  /////////////////////////
////////////////////////////////////////////////////////////////////////

require( 'dotenv' ).config();

import bodyParser     from 'body-parser'
import Charrette      from "../alphachat/alphachat.js";

const getConstructor = function() {
	// creating and storing a new microservices conflict object
	let charrette = new Charrette({path: '/sales',
                                 text: 'experimental process',
                                 source: 'sales',
                                 workreq: 'this is the workreq'});

	// calling the addEvent method on our object
	charrette.addEvent({path: '/sales',
                      text: 'experimental process',
                      source: 'sales'});

	console.log(charrette);
}

////////////////////////////////////////////////////////////
////////////////      sales bot  //////////////////////////
//////////////////////////////////////////////////////////

module.exports = function(router) {
  router.use(bodyParser.json());

  router.post('/sms', function(req, res, next) {

    var io = req.app.get('socketio');
    console.log('SALES API Route');

    getConstructor();

    res.setHeader('Content-Type', 'text/xml')
    res.status(200).send({ text: "chaoticbots rule" });
    io.emit('incoming data');

   next();

 })
}
