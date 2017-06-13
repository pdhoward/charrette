'use strict';

////////////////////////////////////////////////////////////////
/////                 AlphaChat                       ///////
////    Linking business with conversational markets   ///////
////                 c2016 xio                        ///////
////////////////////////////////////////////////////////////

import { TWILIOSMS, TWILIO,
          FACEBOOK, SLACK,
          WEBUI, TWITTER,
          SIRI, ALEXA,
          LINE, WECHAT
        }                  from '../../constants/channels.js'

import { getformatTwilioSMS } from './formattwiliosms';
import { getformatTwilio }    from './formattwilio';
import { getformatFacebook }  from './formatfacebook';
import { getformatSlack }     from './formatslack';
import { getformatWebUI }     from './formatwebui';
import { getformatTwitter }   from './formattwitter';
import { getformatSiri }      from './formatsiri';
import { getformatAlexa }     from './formatalexa';
import { getformatLine }      from './formatline';
import { getformatWeChat }    from './formatwechat';


const actions = [
  { channel: TWILIOSMS, handler: getformatTwilioSMS },
  { channel: TWILIO,    handler: getformatTwilio },
  { channel: FACEBOOK,  handler: getformatFacebook },
  { channel: SLACK,     handler: getformatSlack },
  { channel: WEBUI,     handler: getformatWebUI },
  { channel: TWITTER,   handler: getformatTwitter },
  { channel: SIRI,      handler: getformatSiri },
  { channel: ALEXA,     handler: getformatAlexa },
  { channel: LINE,      handler: getformatLine },
  { channel: WECHAT,    handler: getformatWeChat },
]

module.exports = formatUI;

function formatUI(workreq) {

  console.log('----ENTERED UI INDEX FORMAT UI-----')
  console.log({workreq: workreq})

    switch (workreq.channel) {
      case TWILIOSMS:
        console.log('--------DEBUG---------')
        console.log({workreq: workreq})

        getformatTwilioSMS(workreq, function(data) {
          console.log('finished it')
          console.log({data: data})
          return
        })
        break;
        case TWILIO:
          getformatTwilio.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case FACEBOOK:
          getformatFacebook.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case SLACK:
          getformatSlack.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case WEBUI:
          getformatWebUI.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case TWITTER:
          getformatTwitter.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case SIRI:
          getformatSiri.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case ALEXA:
          getformatAlexa.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case LINE:
          getformatLine.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case WECHAT:
          getformatWeChat.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
      default:
        console.log("UI Format not supported");
    }
  };
