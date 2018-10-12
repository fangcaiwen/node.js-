/**
 * Created by wind  on 2018/9/29
 *
 * Description:
 */
'use strict'

var UserAdmin  = require('../../models/user/index');
var formidable = require('formidable');
var dtime = require('time-formater');
var BaseController = require('../BaseController');


class User extends BaseController{
    constructor(){
        super();
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.edit = this.edit.bind(this);
        this.getOne = this.getOne.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    // 增加数据
    async add(req,res,next){
            if(!req.body.name||!req.body.age){
                res.send({
                    status: 0,
                    message: '数据填写不完整',
                });
                return;
            }
            try{
                const userId = await this.getId('user_id');//自增id
                const newUser = {
                    id:userId,
                    name:req.body.name,
                    age:req.body.age,
                    password:req.body.password,
                    create_time:dtime(new Date()).format('YYYY-MM-DD HH:mm')
                };

                // 添加到数据库
                await UserAdmin.create(newUser);
                res.send({
                    status: 1,
                    message: '添加成功',
                })
            }catch (err){
                res.send({
                    status: 0,
                    message: '添加失败',
                    err:err
                })
            }

    };

    // 编辑数据
    async edit(req,res,next){
        const userId = req.body.userId;
        if(!userId){
           res.send({
              status:0,
              message:'没有要编辑的信息'
           });
           return;
        }
        try{
            // 查找老数据
            const userinfo = await UserAdmin.findOne({id:userId});

            // 合并老数据与新数据得到新对象
            const newObj = Object.assign(userinfo,req.body);

            // 更新数据库
            await UserAdmin.findOneAndUpdate(newObj);

            // 把更新后的数据传给前台
            const newUserInfo = await UserAdmin.findOne({id:userId});
            res.send({
                status:1,
                message:'修改成功',
                result:newUserInfo
            });
        }catch (err){
            res.send({
                status: 0,
                message: '编辑失败',
                err:err
            })
        }
    };

    // 删除数据
    async remove(req,res,next){
        const userId = req.body.userId;
        if(!userId){
            res.send({
                status: 0,
                message: '没有要删除的信息',
            });
            return;
        }
        try{

            // 找到数据并删除
            await UserAdmin.findOneAndRemove({id:userId});
            res.send({
                status: 1,
                message: '删除成功',
            })
        }catch (err){
            res.send({
                status: 0,
                message: '删除失败',
                err:err
            })
        }

    };

   // 查询单条数据
   async getOne(req,res,next){
       const userId = req.query.userId;
       if(!userId){
           res.send({
               status: 0,
               message: '没有要查询的信息',
           });
           return;
       }
       try{
           // 根据id从数据库查找

           const userinfo = await UserAdmin.findOne({id:userId});
           res.send({
               status:1,
               result:userinfo
           });
       }catch (err){
           res.send({
               status: 0,
               message: '查询失败',
               err:err
           });
       }
   };

   // 获取所有数据
    async getAllUsers(req,res,next){
        try{
            const userList = await UserAdmin.find();
            res.send({
                status:1,
                result:userList
            });

        }catch (err){
            res.send({
                status: 0,
                message: '查询失败',
                err:err
            });
        }
    };

}

module.exports = new User();