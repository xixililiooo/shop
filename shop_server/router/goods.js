const Router = require('koa-router');
const fse = require('fs-extra');
const path = require('path');
const mongoose = require('mongoose');
let router = new Router({
    prefix: '/goods'
});
let goodPromise = (good)=>{
    const Goods = mongoose.model('Goods');
    return new Promise((resolved,reject)=>{
        let newGoods = new Goods(good);
        newGoods.save().then(()=>{
            resolved();
        })
    })
}
router.get('/insertGoodsInfo', async (ctx, next) => {
   
    let goodsData = await fse.readFile(path.resolve(__dirname, '../data/goods.json'));
    goodsData = JSON.parse(goodsData)["RECORDS"];
    console.log(Object.prototype.toString.call(goodsData["RECORDS"]));
    await Promise.all(
        goodsData.map(good=>goodPromise(good))
    )
    ctx.body = '开始导入商品数据';
})
router.get('/insertAllCategory', async (ctx) => {
    const Category = mongoose.model('Category');
    let categoryData = await fse.readFile(path.resolve(__dirname, '../data/category.json'));
    categoryData = JSON.parse(categoryData)["RECORDS"];
    // console.log(Object.prototype.toString.call(goodsData["RECORDS"]));
    await categoryData.map(async (cate, index) => {
        let newCategory = new Category(cate);
        await newCategory.save();
    })
    ctx.body = '开始导入分类数据';
})
router.get('/insertCategorySub',async (ctx)=>{
    const CategorySub = mongoose.model('CategorySub');
    let categorySubData = await fse.readFile(path.resolve(__dirname,'../data/category_sub.json'));
    categorySubData = JSON.parse(categorySubData)["RECORDS"];
    await categorySubData.map(async (sub,index)=>{
        let newCategorySub = new CategorySub(sub);
        await newCategorySub.save();
    })
    ctx.body = "开始导入子类数据";
})
//获得商品详情的路由
router.post('/getGoodsInfo',async (ctx)=>{
    try{
        let {goodsId} = ctx.request.body;
        let Goods = mongoose.model('Goods');
        let result = await Goods.findOne({ID:goodsId}).exec();
        ctx.body = {code:200,message:result}
    }catch(err){
        ctx.body = {code:500,message:err}
    }
})
router.get('/getCategoryList',async (ctx)=>{
    try{
        let Category = mongoose.model('Category');
        let result = await Category.find().exec();
        ctx.body = {
            code:200,
            message:result
        }
    }catch(err){
        ctx.body = {
            code:500,
            message:err
        }
    }
})
//获取小类的接口
router.post('/getCategorySubList',async (ctx)=>{
    try{
        let {categoryId} = ctx.request.body;

        // console.log(categoryId);
        const CategorySub = mongoose.model('CategorySub');
        let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec();
        ctx.body = {
            code:200,
            message:result
        }
    }catch(err){
        ctx.body = {
            code:500,
            message:err
        }
    }
})
router.post('/getGoodsListByCategorySubID',async (ctx)=>{
    try{
        let { categorySubId,page } = ctx.request.body;
        console.log(categorySubId);
        let num = 10;//每一页显示的数量
        let start = (page-1)*num;
        const Goods = mongoose.model('Goods')
        let result = await Goods.find({SUB_ID:categorySubId})
        .skip(start)  //从start位置开始
        .limit(num) //选取10个数据
        .exec();
        ctx.body={code:200,message:result};
    }catch(err){
        ctx.body={code:500,message:err};
    }
})
router.get('/getGoodsInfo',async (ctx)=>{
    ctx.body = "getGoodsInfo";
})
module.exports = router;