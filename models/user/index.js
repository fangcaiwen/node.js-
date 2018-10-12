/**
 * Created by wind  on 2018/9/29
 *
 * Description:
 */
'use strict';
var mongoose  =require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    id:Number,
    name:String,
    age:Number,
    password:{type:String,default:"888999"},
    create_time:String
});

userSchema.index({id:1});

const User = mongoose.model('User',userSchema);

module.exports = User;

