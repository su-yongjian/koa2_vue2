// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const Router = require ('koa-router')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.post('/register',async(ctx)=>{
    console.log(ctx.request.body);
    // 取得model
    const User = mongoose.model('User')
    //把从前端接收的POST数据封装成一个新的user对象
    let newUser = new User(ctx.request.body);
    //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
    await newUser.save().then(()=>{
        // 成功返回code=200，并返回成功信息
        ctx.body = {
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        // 失败返回code=500，并返回错误信息
        ctx.body={
            code:500,
            message:error
        }
    })
    // ctx.body= ctx.request.body
})
// 登录请求路由
router.post('/login',async(ctx)=>{
    console.log(ctx.request.body);
    let loginUser = ctx.request.body ;
    let username = loginUser.username ;
    let password = loginUser.password ;
    // 引入user映射表
    const User = mongoose.model('User');
    // 查找用户是否存在，如果存在开始比对密码
    await User.findOne({username:username}).exec().then(async(res)=>{
        console.log(res);
        if(res){
            let newUser = new User();//因为是实例方法，所以要new出对象，才能调用
            await newUser.comparePassword(password,res.password).then((isMatch)=>{
                ctx.body = {code:200,message:isMatch}
            }).catch(error=>{
                console.log(error);
                ctx.body = {code:500,message:error}
                
            })
        }else{
            ctx.body={code:200,message:'用户不存在'}
        }
        
    }).catch(error=>{
        console.log(error);
        ctx.body=  {code:500,message:error}
        
    })
    
})
module.exports=router;