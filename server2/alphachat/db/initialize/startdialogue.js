'use strict';

import Dialogue                   from '../models/Dialogue';
import dialogues                  from './dialogues';
const limit = 1;

function isLive () {
      Dialogue.find({}).limit(limit).exec(function (err, collection){
          if (collection.length === 0) {
            // iterate over the set of channels for initialization and create entries
            dialogues.map(function(dialogue) {
                var newDialogue = new Dialogue(dialogue)
                newDialogue.save(function (err, data) {
                  if(err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                  }
                })
              })
            console.log('Dialogue Collection Is Live')
            return
          }
          else {
            console.log('Dialogue Collection Already Exists')
          }
        })
      }

module.exports = {
  isLive: isLive
}
