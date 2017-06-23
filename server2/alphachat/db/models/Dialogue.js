'use strict';

////////////////////////////////////////////////////////////////////////
////////   Dialogue Class for Tracking Messages Across Session  ///////
///////         Creates a Uniform Bundle of Interactions       ///////
//////////////////////////////////////////////////////////////////////
import mongoose from "mongoose";

let Schema = mongoose.Schema;

var DialogueSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: "Message"
  }]
});

let Dialogue = mongoose.model("Dialogue", DialogueSchema);

module.exports = Dialogue;
