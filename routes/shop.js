/**
 * Created by wind  on 2018/9/29
 *
 * Description:
 */
'use strict'
var express = require('express');
var router = express.Router();
router.post('/detail',function (req,res,next) {
    console.log("req",req);
    console.log("res",res);
    res.send({id:req.body.id,name:req.body.name,age:req.body.age});
});
module.exports = router;