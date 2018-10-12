'use strict'
var express = require('express');
var router = express.Router();
var User = require('../controller/users/index');


    /* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resourcewww');
});

router.get('/list', function(req, res, next) {
    console.log("req",req);
    console.log("res",res);
    res.send({name:req.query.name,age:req.query.age});
});

router.post('/add',User.add);// 增加

router.post('/remove',User.remove); //删除

router.post('/edit',User.edit);// 修改

router.get('/getOne',User.getOne);// 根据id查找

router.get('/getAllUsers',User.getAllUsers);// 获的所有数据
 

module.exports = router;
