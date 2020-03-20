const Router = require('koa-router');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = new Router({
    prefix:'/user'
})
router.get('/',async (ctx,next)=>{
    ctx.body = 'this is user';
})
router.post('/register',async (ctx,next)=>{
    let {username,password} = ctx.request.body;
    // ctx.body = ctx.request.body
    const User = mongoose.model('User');
    let newUser = new User({
        userName:username,
        password:password
    });
    await newUser.save().then(()=>{
        ctx.body = {
            code:200,
            message:'注冊成功'
        }
    })
    .catch(err=>{
        console.log(err);
        ctx.body = {
            code:500,
            message:err
        }
    })
    
})
router.post('/login',async (ctx,next)=>{
    let {username,password} = ctx.request.body;
    const User = mongoose.model('User');
    const newUser = new User();
    let result = await User.findOne({userName:username}).exec(); //根据用户名查找结果
    console.log(result);
    if(result){  //如果用户名存在
        let isMatch = await newUser.comparePassword(password,result.password);
        // console.log(isMatch);
        if(!!isMatch){
            const token = jwt.sign({
                username
            },'xixilili',{expiresIn:'1h'});
            ctx.body = {
                code:200,
                data:{
                    userid:result._id,
                    token,
                    username:result.userName
                },
                message:"登录成功"
            }
        }else{
            ctx.body = {
                code:200,
                message:"用户名或者密码错误"
            }
        }
    }else{
        ctx.body = {
            code:200,
            message:"用户不存在"
        }
    }
})
router.get('/getUserinfo',async (ctx,next)=>{

})
module.exports = router;