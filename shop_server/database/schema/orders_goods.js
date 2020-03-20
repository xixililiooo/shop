const createOrdersGoodsSchema = ()=>{
    const mongoose = require('mongoose');
    const Scheam = mongoose.Schema;
    const Objectid = Scheam.Types.ObjectId;
    let ordersGoodsSchema = new Scheam({
        orderid:{type:Objectid},
        goodsid:{type:String},
        count:{type:String}
    },{ 
        collection:"ordersgoods"
    });
    mongoose.model("ordersgoods",ordersGoodsSchema);
}
module.exports = createOrdersGoodsSchema;