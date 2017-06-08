
////////////////////////////////////////////////////////////////
/////                 hypermarket                       ///////
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
module.exports = HyperClient;

// constructor function for 'straight through' execution of microservices
function HyperClient () {
  this._clients = configureClients;

};

HyperClient.prototype.configure = function(obj) {
  console.log(obj)
}
