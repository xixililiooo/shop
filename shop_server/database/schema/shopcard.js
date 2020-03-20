const createCartSchema = () => {
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    const shopcartSchema = new Schema({
        CART_ID: { unique: true, type: String }, //商品id
        CART_NUMBER: { type: String },
        USER_ID:{type:String}
    }, {
        collection: 'shopcart'
    })
    mongoose.model('shopcart',shopcartSchema);
}
module.exports = createCartSchema;