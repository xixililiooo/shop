const fse = require('fs-extra');
const path =require('path');
const Router = require('koa-router');
const router = new Router({
    prefix:'/test'
});
router.get('/',async (ctx,next)=>{
    // let readStream = fse.createReadStream(path.resolve(__dirname,'../data.json'));
    // readStream.on('end',(data)=>{
    //     console.log(data);
    //     ctx.body = "this is test";
    // })
    let data = await fse.readFile(path.resolve(__dirname,'../data.json'));
    ctx.body = JSON.parse(data);
})
module.exports = router;