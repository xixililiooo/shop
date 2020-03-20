
const createGoodsSchema = () => {
    const mongoose = require('mongoose')    //引入Mongoose
    const Schema = mongoose.Schema          //声明Schema
    let ObjectId = Schema.Types.ObjectId    //声明Object类型
    const goodsSchema = new Schema({
        ID: { unique: true, type: String }, //商品id
        GOODS_SERIAL_NUMBER: String,  //商品编号
        SHOP_ID: String,   //店铺id
        SUB_ID: String,    //
        GOOD_TYPE: Number,  //商品分类
        STATE: Number,  //商品状态
        NAME: String,  //商品名称
        ORI_PRICE: Number,  //商品原来的价格
        PRESENT_PRICE: Number,  //商品现在的价格
        AMOUNT: Number,  //商品的数量
        DETAIL: String,  //商品详情
        BRIEF: String,   //商品简介
        SALES_COUNT: Number, //商品销售额
        IMAGE1: String,  //商品图片1
        IMAGE2: String,  //商品图片2
        IMAGE3: String,  //商品图片3
        IMAGE4: String,  //商品图片4
        IMAGE5: String,  //商品图片5
        ORIGIN_PLACE: String,
        GOOD_SCENT: String,
        CREATE_TIME: String,  //保存时间
        UPDATE_TIME: String,  //更新时间
        IS_RECOMMEND: Number,  //是否是推荐商品
        PICTURE_COMPERSS_PATH: String
    }, {
        collections: 'goods'
    })
    mongoose.model('Goods', goodsSchema)
}
module.exports = createGoodsSchema;