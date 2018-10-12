/**
 * Created by wind  on 2018/9/29
 *
 * Description:数据库连接
 */
'use strict';
var mongoose =  require('mongoose');

mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true });

const db = mongoose.connection;

// 连接成功
db.once('open',() => {
    console.log("数据库连接成功");
});

// 连接失败
db.on('error',(error) => {
    console.log("数据库连接失败"+error);
    db.disconnect();
});

// 连接关闭
db.on('close',function () {
    console.log("数据库断开，重新链接数据库");
    mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true });
});

module.default = db;