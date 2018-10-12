/**
 * Created by wind  on 2018/10/10
 *
 * Description:
 */
'use strict'
var mongoose = require('mongoose');

const idsSchema = new mongoose.Schema({
    user_id:Number
});

const Ids = mongoose.model('Ids',idsSchema);

Ids.findOne((err,data) => {
    if(!data) {
      const newIds = new Ids({
          user_id:0
      });
      newIds.save();
    }
});
module.exports = Ids;