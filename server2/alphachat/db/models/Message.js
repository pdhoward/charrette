'use strict';

////////////////////////////////////////////////////////////////////////
////////   Message Class Captures  Message LifeCycle Data        ///////
///////    classifier - npm natural topic id                    ///////
//////////////////////////////////////////////////////////////////////
import mongoose from "mongoose";
import channels from '../../config/channels'

let Schema = mongoose.Schema;

var MessageSchema = new Schema({
  message: {
    type: Schema.Types.Mixed
  },

  format: {
    type: Schema.Types.Mixed
  },

  response: {
    type: Schema.Types.Mixed
  },

  stack: {
    type: Array
  },

  state: {
    type: Schema.Types.Mixed
  },

  date: {
    type: Date,
    default: Date.now
  },

  channel: {
    type: String,
    validate: [
      function(input) {
        for ( i = 0; i < channels.length; i++)  {
          if (input == channels[i]) return true
        }
      },
      // Error Message
      "Message Channel Not Currently Supported (2001)"
    ]
  }

});

let Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
