'use strict';

///////////////////////////////////////////////////////////////////////
/////////////////// configure chaoticbot agents    ////////////////////
//////////////////////////////////////////////////////////////////////

import uuid 		      from 'node-uuid';
import {getopenwhisk}  	  from '../handleapi/index'

const configureAgents = [
  { name: 'shipper',
	id: '${Date.now()}${uuid.v4()}',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I will help you ship',
	priority: '1',
	handle: 'cb-dev-shipproduct',
	handler: getopenwhisk
	   },
  { name: 'banter',
  id: '${Date.now()}${uuid.v4()}',
  avatar: 'https://www.gravatar.com/avatar/',
  greeting: 'Hi I will help you ship',
  priority: '1',
  handle: 'cb-dev-banter',
  handler: getopenwhisk
   	 },
  { name: 'sales',
    id: '${Date.now()}${uuid.v4()}',
    avatar: 'https://www.gravatar.com/avatar/',
    greeting: 'Hi I am your sales rep',
    priority: '1',
    handle: 'cb-dev-sales',
    handler: getopenwhisk
    },
  { name: 'proof',
    id: '${Date.now()}${uuid.v4()}',
    avatar: 'https://www.gravatar.com/avatar/',
    greeting: 'Hi I am proof, here to provide a reference',
    priority: '1',
    handle: 'cb-dev-proof',
    handler: getopenwhisk
    },
  { name: 'avatar',
    id: '${Date.now()}${uuid.v4()}',
    avatar: 'https://www.gravatar.com/avatar/',
    greeting: 'Hi I am the avatar which creates live sessions',
    priority: '1',
    handle: 'cb-dev-avatar',
    handler: getopenwhisk
    },
  { name: 'purchase',
	id: '${Date.now()}${uuid.v4()}',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I will help you buy',
	priority: '1',
	handle: 'cb-dev-orderproduct',
	handler: getopenwhisk
	   },
  { name: 'payor',
	id: '${Date.now()}${uuid.v4()}',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I will help you pay',
	priority: '1',
	handle: 'payor',
	handler: 'slack'
	    },
  { name: 'dispute',
	id: '${Date.now()}${uuid.v4()}',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hi I can take your issue',
	priority: '1',
	handle: 'dispute',
	handler: 'open'
		},
  { name: 'Nancy',
	id: '${Date.now()}${uuid.v4()}',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Hello, this is Nancy. How can I help?',
	priority: '1',
	handle: 'nancy',
	handler: 'google'
		},
  { name: 'chaotic',
	id: '${Date.now()}${uuid.v4()}',
	avatar: 'https://www.gravatar.com/avatar/',
	greeting: 'Not known',
	priority: '1',
	handle: 'cb-dev-chaotic',
	handler: getopenwhisk
		}
]

module.exports = configureAgents;
