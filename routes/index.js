'use strict';
var shop = require('./shop');
var users = require('./users');

const router = app =>{
  app.use('/shop',shop);
  app.use('/users',users);
};
module.exports = router;
