
////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversation markets     ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

// CONSTRUCTOR FOR CONFIGURING PLATFORM OBJECT

import uuid             from 'uuid/v1';

// private
const configurePlatforms = [];

let platformObject = {
  name: '',
  apihost: '',
  api: '',
  url: '',
  username: '',
  password: '',
  version_date: '',
  version: '',
  _api_key: '',
  _id: uuid()
}

//public
module.exports = AlphaPlatform;

// constructor function for 'straight through' execution of microservices
function AlphaPlatform () {
  this._platforms = configurePlatforms;
};

AlphaPlatform.prototype.configure = function(obj) {
  obj.map(function(x) {
    platformObject = Object.assign(platformObject, x)
    platformObject._api_key = platformObject.username + ':' + platformObject.password;
    configurePlatforms.push(platformObject);
  })
  console.log('---------------')
  console.log('Configured Platform: ' + configurePlatforms.length)
}
