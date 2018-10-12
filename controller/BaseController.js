/**
 * Created by wind  on 2018/9/29
 *
 * Description:
 */

var Ids = require('../models/ids');

module.exports  = class BaseController{
   constructor(){
      this.idList = ['user_id'];
   }
   // 获取id列表
   async getId(type){
       if(!this.idList.includes(type)){
           throw new Error('id类型错误');
           return;
       }
       try{
           const idData = await Ids.findOne();
           idData[type] ++;
           await idData.save();
           return idData[type];

       }catch(err){
           throw new Error(err)
       }
   };
}