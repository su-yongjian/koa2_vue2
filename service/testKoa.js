const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    ctx.body='<h1>hello world</>'
})
app.listen(3000,()=>{
    console.log('service at port 3000 starting');
    
})