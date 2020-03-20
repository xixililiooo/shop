const koa = require('koa');
const Router = require('koa-router');
const user = require('./router/user.js'); //用户模块路由
const test = require('./router/test.js'); //测试模块路由
const goods = require('./router/goods.js'); //商品模块路由
const cart = require('./router/shopcart')  //购物车模块
const orders = require('./router/orders')
const cors = require('koa2-cors'); //跨域中间件
const bodyParser = require('koa-bodyparser');  //处理body数据的中间件
const koajwt = require('koa-jwt');  //负责token验证的中间件
const {
    connect,
    createUserSchema,
    createGoodsSchema,
    createCategorySchema,
    createCategorySubSchema,
    createCartSchema,
    createOrdersSchema,
    createOrdersGoodsSchema
}  = require('./database/init');
let router = new Router();
let app = new koa();
app.use(cors());
app.use(bodyParser());
// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            console.log('xxx');
        }else{
            throw err;
        }
    })
})
//设置path不用验证
app.use(koajwt({
    secret: 'xixilili'
}).unless({
path: [/\/user\/login/,/\/user\/register/,/\/goods\/.*/,/\/test.*/]
}));
app.use(user.routes()).use(user.allowedMethods()); //负责用户模块的路由
app.use(test.routes()).use(test.allowedMethods());  //负责数据的模块
app.use(goods.routes()).use(goods.allowedMethods());  //负责商品的模块
app.use(cart.routes()).use(cart.allowedMethods()); //负责购物车模块
app.use(orders.routes()).use(orders.allowedMethods());
app.use(router.routes());
(async ()=>{
    await connect();
    createUserSchema();  //创建用户信息的表结构
    createGoodsSchema(); //创建商品信息的表结构
    createCategorySchema(); //创建分类信息的表结构
    createCategorySubSchema(); //创建子分类的表结构
    createCartSchema(); //创建购物车的表结构
    createOrdersSchema();
    createOrdersGoodsSchema();
})()
app.listen(3300,()=>{
    console.log('server is running');
});