
////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversation markets     ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

// CONSTRUCTOR FOR CONFIGURING CLIENT OBJECT

import uuid             from 'uuid/v1';

// private
const configureAgents = [];

let agentObject = {
  name: '',
  avatar: '',
  greeting: '',
  handle: '',
  platform: '',
  _id: uuid()
}

//public
module.exports = AlphaAgent;

// constructor function for 'straight through' execution of microservices
function AlphaAgent () {
  this._agents = configureAgents;
};

AlphaAgent.prototype.configure = function(obj) {
  obj.map(function(x) {
    agentObject = Object.assign(agentObject, x)
    configureAgents.push(agentObject);
  })
  console.log('---------------')
  console.log('Configured Agents: ' + configureAgents.length)
}
