
'use strict';
/////////////////////////////////////////////////////////////////////////
/////////////////// configure handlers for each interface  /////////////
//////////////////   import sdk based on agent handler   //////////////
//////////////////////////////////////////////////////////////////////


const formatTwilioSMS = {
  get: function(workreq, cb) {
    console.log('EXECUTING TWILIO SMS HANDLER')
    let updatedWorkReq = {}
    updatedWorkReq.body =  workreq.body
    updatedWorkReq.alpha = workreq.alpha
    updatedWorkReq.format = {
              sender:   workreq.body.From,
              receiver: workreq.body.To,
              text:     workreq.body.Body

        }

    console.log(updatedWorkReq)
    cb(updatedWorkReq);

  }
}

export const getformatTwilioSMS = formatTwilioSMS.get.bind(formatTwilioSMS)
