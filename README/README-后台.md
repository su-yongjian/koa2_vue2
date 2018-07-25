# 编写后台服务接口配置文件
### 在开发中我们现在直接把数据接口文件写到了axios中，这样写如果地址改变或者接口改变，我们需要进入业务逻辑代码进行修改，维护起来会非常的麻烦。那这节课我们就把项目中用到的接口都单独拿出来，作一个接口配置文件serviceAPI.config.js。
## 编写接口配置文件
项目src目录下建立serviceAPI.config.js,然后打开编写如下代码。

````
const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo'
}
 
module.exports = URL
````

编写好后，我们可以直接在要使用的文件中用import的形式引入。 引入后就可以直接使用了。 

````
import url from '@/serviceAPI.config.js'
axios({
    url: url.getShoppingMallInfo,
    method: 'get',
})
````

前端部分已经学的差不多了，现在需要作一些后端服务来支撑前端的数据了，也就是Koa2和MongoDB要登场了。为了演示方便，我们就不单独起个项目了，而是在这个项目中新建一个`Service`文件夹。 

### 安装Koa和MongoDB到项目中

1.首先在项目根目录下建立文件夹`service`，然后进入文件。 

npm install --save koa 

### 编写一个Hello World 测试一下安装是否成功

````
const Koa = require('koa')
const app = new Koa()
 
app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})
 
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
````

编写好以后，使用`node index.js`来启动服务，然后在浏览器中输入`http://loacalhost:3000`，如果正常显示hell koa2 说明我们的koa2已经安装成功。 

# 安装MongoDB数据库

### 安装步骤

1. 去官网下载MongoDB，https://www.mongodb.com/ ,在网站中找到Download按钮。下载会有点忙， 国外的服务器，你懂的。
2. 下载后进行安装，安装没什么难度，但是对于新手建议选择默认安装，而不选择自己配置。等我们完全熟悉后再定制式配置。
3. 安装时如果有安全软件，会报一些拦截，一律允许就好，不允许会安装失败的。
4. 安装完成后，需要配置“环境变量”，目的是再命令行中直接使用，而不需要输入很长的路径了。（此步骤观看视频）

### 运行MongoDB服务端

安装好MongoDB数据库后，我们需要启用服务端才能使用。启用服务的命令是：Mongod。

1. 打开命令行:先打开运行（快捷键win+R），然后输入cmd后回车，就可以打开命令行工具。
2. 执行mongod:在命令中直接输入mongod，但是你会发现服务并没有启动，报了一个exception，服务停止了。
3. 新建文件夹:出现上边的错误，是因为我们没有简历Mongodb需要的文件夹，一般是安装盘的根目录，建立data/db,这两个文件夹。
4. 运行mongod：这时候服务就可以开启了，链接默认端口是27017。

### 下载Robo3

------

由于我们是作项目，所以图形界面比较直观，我们上边并没有安装图形界面，这里我们使用Robo3来弥补一下。

下载地址：https://robomongo.org/download

然后就是下一步下一步安装了。

# Koa用Mongoose连接数据库（1）

### Mongoose概念

> Mongoose是一个开源的封装好的实现Node和MongoDB数据通讯的数据建模库。

### Mongoose的安装

还是使用npm来进行安装。

npm install mongoose --save 

### 连接数据库

我们在项目的`service`文件夹下建立一个`database`文件夹，用来存放和数据库操作有关的文件。在database文件夹下，建立一个`init.js`文件，用来作数据库的连接和一些初始化的事情。

/service/database/init.js

````
const mongoose = require('mongoose')
const db = "mongodb://localhost/simle-db"
 
mongoose.Promise =  global.Promise
 
exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
 
    //增加数据库连接的事件监听
    mongoose.connection.on('disconnected',()=>{
        //进行重连
        mongoose.connect(db)
    })
 
    //数据库出现错误的时候
    mongoose.connection.on('error',err=>{
        console.log(err)
        mongoose.connect(db)
    })
 
    //链接打开的时候
    mongoose.connection.once('open',()=>{
        console.log('MongoDB Connected successfully!')
    })
 
}
````

然后在`/service/index.js`里加入立即执行函数，在使用前记得用require进行引入 `connect`。 

````
//引入connect
const {connect} = require('./database/init.js');
 
//立即执行函数;
(async () =>{
    await connect()
})()
````

然后我们在中终端里使用`node index.js`执行一下，可以看到数据库已经连接成功了。 

#  Koa用Mongoose连接数据库（2）

### 增加Promise的支持

我们在作这个init.js文件时，必须确保先连接数据库后，再作其他事情，所以我们需要在所有代码的外层增加一个`Promise`。 

````
return  new Promise((resolve,reject)=>{
//把所有连接放到这里
})
````

### 连接失败自动重连

一般数据库连接失败，我们会重新连接，但这个重连也是需要有一个次数的，比如连接3次失败，我们在服务端抛出异常。 首先声明一个最大连接数`maxConnectTimes`.

let maxConnectTimes = 0  

当连接断开时，我们进行重连的代码如下： 

```
mongoose.connection.on('disconnected',()=>{
    console.log('***********数据库断开***********')
    if(maxConnectTimes<3){
        maxConnectTimes++
        mongoose.connect(db)    
    }else{
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
    }
    
})
```

当连接断开时，我们需要把连接次数加1，并重新连接数据库。当重连次数超过3次后，我们抛出了异常，并用reject()通知了promise。 同样当连接出错时，我们也要进行重连操作。 

````
mongoose.connection.on('error',err=>{
    console.log('***********数据库错误***********')
    if(maxConnectTimes<3){
        maxConnectTimes++
        mongoose.connect(db)   
    }else{
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
    }
 
})
````

### 全部文件

````
const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-db"
 
exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
 
    let maxConnectTimes = 0 
 
    return  new Promise((resolve,reject)=>{
    //把所有连接放到这里
        
        //增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log('***********数据库断开***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)    
            }else{
                reject()
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
            
        })
 
        mongoose.connection.on('error',err=>{
            console.log('***********数据库错误***********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(db)   
            }else{
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
 
        })
        //链接打开的时
        mongoose.connection.once('open',()=>{
            console.log('MongoDB connected successfully') 
            resolve()   
        })
 
    })
 
}
````

# Mongoose的Schema建模介绍

数据库已经可以连接成功了，这节课学习一下如何建模，也就是定义Schema，他相当于MongoDB数据库的一个映射。Schema是一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力。Schema是以key-value形式Json格式的数据。 

### Schema中的数据类型

- String ：字符串类型
- Number ：数字类型
- Date ： 日期类型
- Boolean： 布尔类型
- Buffer ： NodeJS buffer 类型
- ObjectID ： 主键,一种特殊而且非常重要的类型
- Mixed ：混合类型
- Array ：集合类型

### Mongoose中的三个概念

- schema ：用来定义表的模版，实现和MongoDB数据库的映射。用来实现每个字段的类型，长度，映射的字段，不具备表的操作能力。
- model ：具备某张表操作能力的一个集合，是mongoose的核心能力。我们说的模型就是这个Mondel。
- entity ：类似记录，由Model创建的实体，也具有影响数据库的操作能力。

### 初学定义一个用户Schema

在`/servcie/database/`文件夹下新建一个`schema`文件夹，然后新建一个`User.js`文件. 

````
const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
 
//创建我们的用户Schema
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
 
})
 
//发布模型
mongoose.model('User',userSchema)
````

# 载入Schema和插入查出数据

Schema建立好以后，需要我们载入这些数据库，当然最好的方法就是在后台服务已启动的时候就把载入做好，所以我们在`service/init.js`里作这件事，然后在index.js里直接执行。 

### 载入所有Schema

直接在`service\init.js` 先引入一个glob和一个resolve 

首先安装glob 

npm install glob --save 

const glob = require('glob')

const {resolve} = require('path')

- glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
- resolve: 将一系列路径或路径段解析为绝对路径。

了解两个引入的模块用法后，我们就可以一次性引入所有的Schema文件了。 

exports.initSchemas = () =>{

​    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)

}

使用了glob.sync同步引入所有的schema文件，然后用forEach的方法require（引入）进来。这比你一条条引入要优雅的多。 

### 插入一条数据

记得在操作数据库前先引入我们的Mongoose和我们刚写好的initSchemas： 

const mongoose = require('mongoose')

const {connect , initSchemas} = require('./database/init.js')

引入好后，我们直接在`service/index.js`的立即执行函数里插入一天User数据 

````
(async () =>{
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'jspang',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
 
})()
//读出已经插入进去的数据
let  users = await  User.findOne({}).exec()
console.log('------------------')
console.log(users)
console.log('------------------')
````

完整的index.js代码如下： 

````
const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const {connect , initSchemas} = require('./database/init.js')
 
//立即执行函数
;(async () =>{
    await connect()
    initSchemas()
    const User = mongoose.model('User')
    let oneUser = new User({userName:'jspang13',password:'123456'})
  
    oneUser.save().then(()=>{
        console.log('插入成功')
        
    })
let  users = await  User.findOne({}).exec()
 
console.log('------------------')
console.log(users)
console.log('------------------')  
})()
 
 
app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})
 
app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})
````

运行service下的代码：node index.js

# 打造安全的用户密码加密机制

虽然可以对数据库的可以进行插入操作了，但是现在使用的都是普通的明文密码，这在实际工作中是肯定不允许，需要对密码进行加密和加盐的处理。 

### 加密处理

密码的加密有很多种加密算法，比如我们使用的MD5加密或者hash256加密算法，其实他们都是hash的算法。就是把你的密码进行一次不可逆的编译，这样就算别人得到了这个密码值，也不能进行直接登录操作。 我们可以通过（http://www.atool.org/hash.php） 网站，直观的看一下加密的算法。 

### 加盐处理

有了加密的处理，我们的密码就安全多了，但是有用户的密码设置的太过简单，很好进行暴力破解或者用彩虹表破解，这时候感觉我们的密码又不堪一击了。这时候我们要使用加盐技术，其实就是把原来的密码里，加入一些其他的字符串，并且我们可以自己设置加入字符串的强度。 

把加盐的数据库密码进行hash处理后，再存入数据库就比较安全了。 

### bcrypt的使用

**简介:** bcrypt是一种跨平台的文件加密工具。bcrypt 使用的是布鲁斯·施内尔在1993年发布的 Blowfish 加密算法。由它加密的文件可在所有支持的操作系统和处理器上进行转移。它的口令必须是8至56个字符，并将在内部被转化为448位的密钥。 

首先是用npm 进行安装 

npm instal --save bcrypt --registry=https://registry.npm.taobao.org 

安装完成后就是引入bcrypt 

````
const bcrypt = require('bcrypt')
````

完整代码schema/User.js

````
const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

//创建UserShema
const userSchema = new Schema({
    UserId :{type:ObjectId},
    userName : {unique:true,type:String},
    password : String,
    createAt:{type:Date, default:Date.now()},
    lastLoginAt:{type:Date, default:Date.now()}
},{
  collection:'user'  
}) 
userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        })
    })
})

userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}


//发布模型
mongoose.model('User',userSchema)

````

# Koa2的用户操作的路由模块化

`koa-router`这个插件，但是所有的路由都写在`service/idnex.js`里显然不是正确的选择，这会导致我们的`index.js`页面越来越臃肿，最后变的没办法维护。我们需要把Koa程序模块化，我们也叫做路由模块化。 

### 安装koa-router

使用npm来安装koa-router，需要注意的是在终端中我们要进入到`service`文件夹下，然后再输入如下命令： 

npm install koa-router --save 

### 新建一个User.js的文件

新建一个appApi的文件夹，然后在进入文件夹，新建User.js的文件。有关User.js的操作，我们以后都会放到这个文件下，就是要编写的供前台使用的接口程序了。 

编写我们User.js文件： 

````
const Router = require ('koa-router')
let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.get('/register',async(ctx)=>{
    ctx.body="用户注册接口"
})
module.exports=router;
````

### 让路由模块化

接下来，我们需要把这个文件和koa-router加入到`service/idnex.js`下面，实现可以访问。 

1.首先在`index.js`的文件顶部，引入koa-router 

+ 1.const Router = require('koa-router') 

  2.引入我们的user.js模块 

  let user = require('./appApi/user.js') 

3.装载所有子路由 

````
let router = new Router();
router.use('/user',user.routes())
````

4.加载路由中间件

````
app.use(router.routes())
app.use(router.allowedMethods())
````

这四步作完了，我们就可以在浏览器中实验一下我们的模块化路由是否起作用了。在浏览器中输入，`http://localhost:3000/user`，已经可以出现我们设定好的用户首页，`http://localhost:3000/user/register访问的是注册页`。 

# 打通注册用户的前后端通讯

### 安装koa-bodyparser中间件

首先我们要接到前端发过来的请求，这时候需要安装`koa-bodyparser`中间件,我们使用npm来进行安装。 记得先进入到`service`目录下，在使用npm进行安装。 

npm install --save koa-bodyparser 

安装好后，在`service/index.js`文件中注册和引入中间件。 

````
const bodyParser = require('koa-bodyparser')
app.use(bodyParser());
````

### 前台的axios请求处理

.在`register.vue`头部引入axios 

或者其他配置也可不引入import axios from 'axios' 

2.修改serviceAPI.config.js接口配置文件 

````
const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',   //用户注册接口
}
 
module.exports = URL
````

这里主要加入了LOCALURL常量的声明，用于存储本地请求路径，和在URL里增加了registerUser接口的地址配置。 

引入接口配置文件 import url from '@/serviceAPI.config.js' 

编写aixos用户注册方法 

进入到`src/components/pages/Register.vue`文件下，在methods属性里，写入如下方法 

````
//*********axios注册用户方法********
axiosRegisterUser(){
        axios({
        url: url.registerUser,
        method: 'post',
        data:{
            username:this.username,
            password:this.password 
        }
    })
    .then(response => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}
````

### 让koa2支持跨域请求

但是个人认为最完美的解决方案是在后台设置支持跨域。对于这个项目后台就是我们的Koa2服务。 

**安装koa2-cors中间件** 

在koa2里解决跨域的中间件叫`koa2-cors`，我们先进入service文件夹，然后直接使用npm来进行安装。 

npm install --save koa2-cors 

安装完成后，记得要在`service/index.js`文件中引入和注册（使用）一下中间件： 

const cors = require('koa2-cors')

app.use(cors())

### 编写koa2接收前台数据的方法

进入`service/appApi/user.js`文件，修改resgister路由接口下的代码，记得把get方法换成post方法。 

````
router.post('/register',async(ctx)=>{
    console.log(ctx.request.body)
    ctx.body= ctx.request.body
})
````

