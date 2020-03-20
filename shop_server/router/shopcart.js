const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router({
    prefix: '/cart'
})
const findOnePromise = (Goods,item)=>{
    return new Promise((resolve,reject)=>{
        Goods.findOne({
            ID:item.CART_ID
        },{DETAIL:0,_id:0}).exec().then((res)=>{
            res = {...res._doc,count:item.CART_NUMBER,_id:item._id};
            resolve(res);
        })
    })
}

//根据userid去shopcart中查找商品id以及count，然后
const getNewestCartList = async (userid,shopcart,Goods) => {
    try {
        // let newCartList = [];
        let result = await shopcart.find({
            USER_ID: userid
        }).exec();
        return Promise.all(
            result.map((item)=>findOnePromise(Goods,item))
        )
    } catch (error) {
        console.log(error);
    }
}
router.post('/getCartList', async (ctx) => {
    const Goods = mongoose.model('Goods');
    let shopcart = mongoose.model('shopcart');
    let {userid} = ctx.request.body;
    let cartList = await getNewestCartList(userid,shopcart,Goods);
    ctx.body = {
        code:200,
        message:"购物车列表获取成功",
        data:cartList
    }
})
router.post('/addCart', async (ctx) => {
    const Goods = mongoose.model('Goods');
    let shopcart = mongoose.model('shopcart');
    let { userid, cartid, count } = ctx.request.body;
    let newshopcart = new shopcart({
        CART_ID: cartid, //商品id
        CART_NUMBER: count,
        USER_ID: userid
    })
    try {
        await newshopcart.save();
        let newCartList = await getNewestCartList(userid,shopcart,Goods);
        // console.log('newC',newCartList)
        ctx.body = {
            code: 200,
            data: newCartList,
            message: "商品添加成功"
        }
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            message: "商品添加失败"
        }
    }
})
router.post('/deleteCart', async (ctx) => {
    const Goods = mongoose.model('Goods');
    let shopcart = mongoose.model('shopcart');
    let { deleteCartList,userid } = ctx.request.body;
    console.log(deleteCartList);
    await shopcart.deleteMany({
        _id:{$in:deleteCartList}
    });
    try {
        let newCartList = await getNewestCartList(userid,shopcart,Goods);
        ctx.body = {
            code: 200,
            data: newCartList,
            message: "商品删除成功"
        }
    } catch (error) {
        console.log(error);
        ctx.body = {
            code: 500,
            message: "商品删除失败"
        }
    }
})
router.post('/changeCart', async (ctx) => {
    let shopcart = mongoose.model('shopcart');
    let {cartId, newCount , goodsId} = ctx.request.body;
    console.log(newCount);
    try{
        await shopcart.updateOne({
            _id:cartId
        }, {
            CART_NUMBER: newCount
        })
        ctx.body = {
            code:200,
            message:"商品信息修改成功"
        }
    }catch(error){
        console.log(error);
    }
})
module.exports = router;