const mongoose = require('mongoose');
const db = "mongodb://localhost/shop";
const createUserSchema = require('./schema/user');  //创建用户的数据库Schema
const createGoodsSchema = require('./schema/goods'); //创建商品的数据库Schema
const createCategorySchema = require('./schema/category'); //创建类别的数据库Schema
const createCategorySubSchema = require('./schema/category_sub'); //创建类别的数据库Schema
const createOrdersSchema = require('./schema/orders');  //创建订单列表的数据库Schema
const createOrdersGoodsSchema = require('./schema/orders_goods');  //创建订单中商品的数据库Schema
const createCartSchema = require('./schema/shopcard')
mongoose.Promise = global.Promise;
let maxConnectTime = 0;
const connect = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(db,{useUnifiedTopology: true,useNewUrlParser:true });
        mongoose.connection.on('disconnected',()=>{
            if(maxConnectTime<3){
                maxConnectTime++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('數據庫出現問題');
            }
        })
        mongoose.connection.on('error',(err)=>{
            if(maxConnectTime<3){
                maxConnectTime++;
                mongoose.connect(db);
            }else{
                reject();
                throw new Error('數據庫出現問題');
            }
        })
        mongoose.connection.once('open',()=>{
            console.log('mongodb connect successfully');
            resolve();
        })
    })
}
module.exports = {
    connect,
    createUserSchema,
    createGoodsSchema,
    createCategorySchema,
    createCategorySubSchema,
    createCartSchema,
    createOrdersSchema,
    createOrdersGoodsSchema
}