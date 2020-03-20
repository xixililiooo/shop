const Router = require('koa-router');
const mongoose = require('mongoose');
let router = new Router({
    prefix:"/orders"
})
let saveAllOrders = (ordersList,ordersId)=>{
    return Promise.all(
        ordersList.map(item=>saveOrderItem({
            goodsId:item.ID,
            count:item.count,
        },ordersId))
    )
}
let saveOrderItem = ({goodsId,count},ordersId)=>{
    let ordersgoods = mongoose.model('ordersgoods');
    let newOrdersGoods = new ordersgoods({
        orderid:ordersId,
        goodsid:goodsId,
        count:count
    });
    return new Promise((resolve,reject)=>{
        newOrdersGoods.save().then((data)=>{
            resolve(data);
        })
    })
}
let findGoods = (ordersGoodsResult)=>{
    let goods = mongoose.model('goods');
    return new Promise((resolve,reject)=>{
        goods.aggregate([
            {
              $lookup:
                {
                  from: "ordersgoods",
                  localField: "ID",
                  foreignField: "goodsid",
                  as: "ordersgoods_doc"
                }
           }
         ]).exec().then((data)=>{

         })
    })
}
let findOrdersGoods = async (ordersItem)=>{
    let ordersgoods = mongoose.model('ordersgoods');
    let ordersGoodsResult = await ordersgoods.find({
        orderid:ordersItem._id
    })

}
let serialData = (data)=>{
    let serialdata = data.map(item=>{
        let goodsInfo = item.ordersgoods_doc[0];
        delete goodsInfo._id;
        delete item.ordersgoods_doc;
        return {...item,...goodsInfo};
    })
    return serialdata;
}
let serialOrdersList = (ordersResult,serialdata)=>{   //把数据进行加工，得到我们想要的数据
    ordersResult.forEach(item=>{
        // console.log(item._id);
        // console.log(serialdata);
        let goodsList = serialdata.filter(good=>{
            // console.log(typeof(good.orderid),typeof(item._id));
            // console.log(good.orderid+''==item._id+'');
            return good.orderid+''==item._id+''  //此处踩坑，因为orderid和_id都是Object类型，过滤的时候要进行字符串转换
        });
        // console.log(goodsList);
        item.goodsList = goodsList;
    })
}   
let findOrders = (ordersIdResult)=>{
    let ordersgoods = mongoose.model('ordersgoods');
    return new Promise((resolve,reject)=>{
        ordersgoods.aggregate([
            {
                $match:{    //先利用match过滤
                    orderid:{$in:ordersIdResult}
                }
            },
            {
              $lookup:  //然后联表查询
                {
                  from: "goods",
                  localField: "goodsid",
                  foreignField: "ID",
                  as: "ordersgoods_doc"
                }
           },
         ]).exec().then((data)=>{
            resolve(data);
         })
    })
}
//用于获取订单列表的接口
router.post('/getOrdersList',async (ctx)=>{
    let {userid} = ctx.request.body;
    let orders = mongoose.model('orders');
    let ordersgoods = mongoose.model('ordersgoods');
    let goods = mongoose.model('Goods');
    let ordersResult = await orders.find({
        userid:userid
    },null,{lean: true})
    let orderIdResult = ordersResult.map(item=>item._id);
    let data = await findOrders(orderIdResult);
    let serialdata = serialData(data);
    // console.log(serialdata);
    serialOrdersList(ordersResult,serialdata);
    // console.log(ordersResult);
    ctx.body = {
        code:200,
        message:'获取订单列表成功',
        data:ordersResult
    }
})
//添加订单接口
router.post('/addOrders',async (ctx)=>{
    let {userid,total,ordersList,status} = ctx.request.body;
    let orders = mongoose.model('orders');
    let newOrders = new orders({
        userid:userid,
        total:total,
        status:status   //0代表未支付，1代表已经支付 
    })
    let newOrder = await newOrders.save();
    // console.log(newOrder);
    await saveAllOrders(ordersList,newOrder._id);
    ctx.body = {
        code:200,
        message:"订单添加成功"
    }
})
//修改订单的接口
router.post('/changeOrders',async (ctx)=>{
    let {ordersId} = ctx.request.body;
})  
module.exports = router;