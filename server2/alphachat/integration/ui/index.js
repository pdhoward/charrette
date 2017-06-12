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
import { formatTwilio }    from './formattwilio';
import { formatFacebook }  from './formatfacebook';
import { formatSlack }     from './formatslack';
import { formatWebUI }     from './formatwebui';
import { formatTwitter }   from './formattwitter';
import { formatSiri }      from './formatsiri';
import { formatAlexa }     from './formatalexa';
import { formatLine }      from './formatline';
import { formatWeChat }    from './formatwechat';


const actions = [
  { channel: TWILIOSMS, handler: getformatTwilioSMS },
  { channel: TWILIO,    handler: formatTwilio },
  { channel: FACEBOOK,  handler: formatFacebook },
  { channel: SLACK,     handler: formatSlack },
  { channel: WEBUI,     handler: formatWebUI },
  { channel: TWITTER,   handler: formatTwitter },
  { channel: SIRI,      handler: formatSiri },
  { channel: ALEXA,     handler: formatAlexa },
  { channel: LINE,      handler: formatLine },
  { channel: WECHAT,    handler: formatWeChat },
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
          formatTwilio.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case FACEBOOK:
          formatFacebook.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case SLACK:
          formatSlack.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case WEBUI:
          formatWebUI.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case TWITTER:
          formatTwitter.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case SIRI:
          formatSiri.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case ALEXA:
          formatAlexa.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case LINE:
          formatLine.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
        case WECHAT:
          formatWeChat.get(workreq, function() {
            console.log('finished it')
            return
          })
        break;
      default:
        console.log("UI Format not supported");
    }
  };
