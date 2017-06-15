
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

////// over req object to track outgoing messages

// override http(s) outgoing connections to track with botMetrics
const originalRequest = http.request;
http.request = function wrapMethodRequest(req) {
  if (req.body) {
    if (req.host === 'graph.facebook.com') {
      try {
        const body = JSON.parse(req.body);
        if (body.recipient && body.recipient.id && body.sender_action !== 'typing_on') {
          // do not track 'typing' messages
          botMetrics.track({
            text: body,
            message_type: 'outgoing',
            user_id: body.recipient.id,
            platform: 'Messenger',
          });
        }
      } catch (error) {
        console.log('wrapMethodRequest:facebook: no body to parse');
      }
    } else if (req.host === 'api.telegram.org') {
      const body = url.parse(`?${req.body}`, true).query;
      if (body.chat_id) {
        botMetrics.track({
          text: body,
          message_type: 'outgoing',
          user_id: body.chat_id,
          platform: 'Telegram',
        });
      }
    } else if (req.host === 'api.kik.com') {
      const body = JSON.parse(req.body);
      if (body.messages) {
        body.messages.forEach((message) => {
          if (message.to && message.type !== 'is-typing') {
            // do not track 'typing' messages
            botMetrics.track({
              text: message,
              message_type: 'outgoing',
              user_id: message.to,
              platform: 'Kik',
            });
          }
        });
      }
    } else {
      // console.warn('non-tracking host', { req });
    }
  }
  // call the original 'request' function
  return originalRequest.apply(this, arguments);
};
