const Koa = require('koa');
const app = new Koa()
const Router = require('koa-router');
let router = new Router();

const mongoose = require('mongoose');
const fs = require('fs');

router.get('/insertAllGoodsInfo',async(ctx)=>{
    fs.readFile('./goods.json','utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            data=JSON.parse(data)
            let saveCount=0
            const Goods = mongoose.model('GoodsList')
            data.map((value,index)=>{
                let newGoods = new Goods(value)
                newGoods.save().then(()=>{
                    saveCount++
                    console.log('成功'+saveCount)
                }).catch(error=>{
                     console.log('失败：'+error.goods)
                })
            })
        }
    })
    ctx.body="开始导入数据"
})
router.get('/getGoodsList',async(ctx)=>{
    const GoodsList = mongoose.model('GoodsList');
    await GoodsList.find().exec().then(async(res)=>{
        ctx.body = {
            code:200,
            message:res
        }
    }).catch(error=>{
        console.log(error);
        ctx.body={
            code:500,
            message:error
        }
    })
})
router.get('/getGoodsInfo',async(ctx)=>{
    // let goodsId = ctx.request.body.goodsId;
    let goodId = "0115ebdaa7b74269aae8239c7faf370b";
    const GoodsList = mongoose.model('GoodsList');
    await GoodsList.findOne({good_id:goodId}).exec().then(async(res)=>{
        ctx.body = {
            code:200,
            message:res
        }
    }).catch(error=>{
        console.log(error);
        ctx.body={
            code:500,
            message:error
        }
        
    })
})
module.exports = router