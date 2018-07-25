const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const mongoose = require('mongoose')
const {connect,initSchemas} = require('./database/init.js') ;
let user = require('./appApi/user.js')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
let router = new Router();

app.use(bodyParser());
app.use(cors())//跨域运行一定要放在app.use(router.routes());前面，否则不生效

// 3.装载所有子路由
router.use('/user',user.routes());
// 这里相当于在浏览器访问：
// http://localhost:3000/user/时加载的是用户首页
// 访问http://localhost:3000/user/register时请求的是注册页
// 即user是访问用户的一级路径    '/' 是user的根目录，'/register'是子目录。类似可以加很多user子目录
// 立即执行
(async ()=>{
    await connect();
    initSchemas();
    // const User = mongoose.model('User');
    // let oneUser = new User({userName:'syj',password:'123456'});
    // oneUser.save().then(()=>{
    //     console.log('插入成功');
    // })
    // // 读出已经插入进去的数据
    // let  users = await  User.findOne({}).exec()
    // console.log('------------------')
    // console.log(users)
    // console.log('------------------')
})()

// 加载路由中间件
app.use(router.routes());
app.use(router.allowedMethods());


// app.use(cors({
//     origin: function (ctx) {
//         if (ctx.url === '/test') {
//             return "*"; // 允许来自所有域名请求
//         }
//         return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
//     },
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'DELETE'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

app.use(async(ctx)=>{
    ctx.body = '<h1>hello word</h1>'
})
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})