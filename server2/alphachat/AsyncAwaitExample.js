AlphaChat.prototype.processMessage = function(data, cb) {

    // open an event listener for errors
    this.catchError();

    let workreq = {};
    workreq.channel = data.channel;
    workreq.db =      this.db
    workreq.orgMsg =  data
    workreq.orgMsg.messagesProcessed = this._messagesProcessed;

    let myFirstPromise = new Promise((resolve, reject) => {
      setTimeout(function(){
        resolve("ASYNC TEST WORKED"); // Yay! Everything went well!
      }, 4050);
    });

    let anotherPromise = new Promise((resolve, reject) => {
      formatUI(workreq, function(response) {
        resolve(response)
      })
    })

    async function test() {
      await myFirstPromise.then((successMessage) => {
        console.log("Yay! " + successMessage);
      });

      await anotherPromise.then((response) => {
        console.log('------------')
        console.log('STEP 1 FORMAT - DONE')
        console.log(response)
        return cb(response)
      })

    }

    test()
/*
    formatUI(workreq, function(response) {
      console.log('------------')
      console.log('STEP 1 FORMAT - DONE')
      console.log(response)
      return cb(response)

    })
*/
}
/*
const makeRequest = async () => {
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  throw new Error("oops");
}
*/

await Stage_100_Map.then((response) => {
  console.log('------------')
  console.log('stage 100 map')
  console.log(response)
  //return cb(response)
})
await Stage_200_State.then((response) => {
  console.log('------------')
  console.log('stage 200 state')
  console.log(response)
  //return cb(response)
})
await Stage_300_Agent.then((response) => {
  console.log('------------')
  console.log('stage 300 agent')
  console.log(response)
//  return cb(response)
})
await Stage_400_Call.then((response) => {
  console.log('------------')
  console.log('stage 400 call')
  console.log(response)
//  return cb(response)
})
await Stage_500_Record.then((response) => {
  console.log('------------')
  console.log('stage 500 record')
  console.log(response)
  return cb(response)
})

/////////////////////////////
// MORE EXAMPLES

async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}

///// object storage
const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars');
    return cache.match(`/avatars/${name}.jpg`);
  }
};

storage.getAvatar('jaffathecake').then(…);
