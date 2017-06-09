'use strict';

///////////////////////////////////////////////////////////////////////
/////////////////// configure alpha agents    ////////////////////
//////////////////////////////////////////////////////////////////////


const configureAgents = [
  { name: 'shipper',	
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I will help you ship',	
	handle: 'cb-dev-shipproduct',
	platform: 'openwhisk'
	   },
  { name: 'banter',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I will help you ship', 
	handle: 'cb-dev-banter',
	platform: 'openwhisk'
   	 },
  { name: 'sales',   
    avatar: 'https://www.gravatar.com/avatar/',
    greeting: 'Hi I am your sales rep',   
    handle: 'cb-dev-sales',
	platform: 'openwhisk'
    },
  { name: 'proof',   
    avatar: 'https://www.gravatar.com/avatar/',
    greeting: 'Hi I am proof, here to provide a reference', 
    handle: 'cb-dev-proof',
	platform: 'openwhisk'
    },
  { name: 'avatar',    
    avatar: 'https://www.gravatar.com/avatar/',
    greeting: 'Hi I am the avatar which creates live sessions', 
    handle: 'cb-dev-avatar',
	platform: 'openwhisk'
    },
  { name: 'purchase',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I will help you buy',	
	handle: 'cb-dev-orderproduct',
	platform: 'openwhisk'
	   },
  { name: 'payor',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I will help you pay',
	handle: 'payor',
	platform: 'openwhisk'
	    },
  { name: 'dispute',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I can take your issue',
	handle: 'dispute',
	platform: 'openwhisk'
		},
  { name: 'Alexa',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hello, this is Alexa. How can I help?',	
	handle: 'Alexa',
	platform: 'openwhisk'

		},
  { name: 'chaotic',	
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Not known',
	handle: 'cb-dev-chaotic',
	platform: 'openwhisk'
		}
]

module.exports = configureAgents;
