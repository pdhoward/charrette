
////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversation markets     ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

// CONSTRUCTOR FOR CONFIGURING CLIENT OBJECT

import uuid             from 'uuid/v1';

// private
const configureClients = [];

let clientObject = {
  name: '',
  url: '',
  addr1: '',
  addr2: '',
  city: '',
  state: '',
  zip: '',
  contact: '',
  phone: '',
  _id: 0
}

//public
module.exports = AlphaClient;

// constructor function for 'straight through' execution of microservices
function AlphaClient () {
  this._clients = configureClients;
};

AlphaClient.prototype.configure = function(obj) {
  obj.map(function(x) {
    clientObject = Object.assign(clientObject, x)
    configureClients.push(clientObject);
  })
  console.log('---------------')
  console.log('Configured Clients: ' + configureClients.length)
}
