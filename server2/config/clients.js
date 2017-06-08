
///////////////////////////////////////////////////////////////////////
/////////////////// configure chaoticbot platforms ////////////////////
//////////////////////////////////////////////////////////////////////

import uuid 		from 'uuid/v1';

// spoof for testing purposes.
// Need to establish a process for retreieving client id for classifier and oauth
// check .env file for current method
// exports.CHAOTIC_CLIENT_ID = 'client1';
// list of customers

const configureClients = [
  {
	name: "Acme Industries",
	url: 'www.website.com',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
	contact: 'Bill Smith',
	phone: '704-555-1212'
  },
  {
	name: "Beta Industries",
	url: 'www.website.com',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
	contact: 'Bill Jones',
	phone: '704-555-1212'
  },
  {
	name: "Alpha Industries",
	url: 'www.website.com',
  addr1: '1234 Main Street',
	addr2: 'Suite 1235',
  city: 'Richmond',
	state:'Virginia',
	zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
	contact: 'Bill Alpha',
	phone: '704-555-1212'
  },
  {
  name: "Allen Jones Enterprises",
  url: 'https://allen.com/about',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Allen',
  phone: '+17045646873'
  },
  {
  name: "Allen Jones Enterprises",
  url: 'https://allen.com/about',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Lora',
  phone: '+17049629327'
  },
  {
  name: "Pivot and Scale",
  url: 'https://pivotandscale.com/about',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Annapolis',
  state:'MD',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Dave',
  phone: '+17853383287'
  },
  {
  name: "Medical Center",
  url: undefined,
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Annapolis',
  state:'MD',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Amanda',
  phone: '+19144507594'
  },
  {
  name: "Kingsman Software",
  url: 'http://kingsmensoftware.com/',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Brad',
  phone: '+17046689228'
  },
  {
  name: "Duke Energy",
  url: 'https://www.duke-energy.com/home',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Mary Alice',
  phone: '+19145271930'
  },
  {
  name: "One7 Academy",
  url: 'http://one7academy.org/',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Lee Anne',
  phone: '+19145271623'
  },
  {
  name: "Charlotte Dentistry",
  url: 'https://www.ibm.com/',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Kent',
  phone: '+17048402464'
  },
  {
  name: "IBM",
  url: 'https://www.ibm.com/',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Armonk',
  state:'NY',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Tom',
  phone: '+16302582794'
  },
  {
  name: "IBM",
  url: 'https://www.ibm.com/',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Armonk',
  state:'NY',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Jean',
  phone: '+16302444716'
  },
  {
  name: "RPI",
  url: 'https://www.ibm.com/',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Armonk',
  state:'NY',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Dorit',
  phone: '+15183694129'
  },
  {
  name: "xio partners",
  url: 'https://www.xiollc.com/',
  addr1: '1234 Main Street',
  addr2: 'Suite 1235',
  city: 'Charlotte',
  state:'NC',
  zip: '12345',
  id: '${Date.now()}${uuid.v4()}',
  contact: 'Pat',
  phone: '+19145005391'
  }

]

module.exports = configureClients;
