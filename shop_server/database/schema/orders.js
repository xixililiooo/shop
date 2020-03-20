const createOrdersSchema = () => {
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const Objectid = Schema.Types.ObjectId;
    let ordersSchema = new Schema({
        userid:{type:Objectid},
        total:{type:String},
        status:{type:String}   //0代表未支付，1代表已经支付   
    }, {
        collection: "orders"
    })
    mongoose.model('orders', ordersSchema);
}
module.exports = createOrdersSchema;
