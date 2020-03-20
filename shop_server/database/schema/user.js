
const createUserSchema = () => {
    const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs')
    const Schema = mongoose.Schema;
    const SALT_WORK_FACTOR = 10;
    let ObjectId = Schema.Types.ObjectId;
    const userSchema = new Schema({
        userId: ObjectId,
        userName: { unique: true, type: String },
        password: String,
        createTime: { type: Date, default: Date.now() },
        lastLoginAt: { type: Date, default: Date.now() }
    },{collection:'user'})

    userSchema.pre('save',function(next){  //每次保存前进行一次盐加密
        bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
            if(err) return next(err);
            bcrypt.hash(this.password,salt,(err,hash)=>{
                if(err) return next(err);
                this.password = hash;
                next();
            })
        })
    })
    //添加一个实例方法，用于校验登录时候密码
    userSchema.methods = {
        comparePassword:(password,AccPassword)=>{
            return new Promise((reslove,reject)=>{
                bcrypt.compare(password,AccPassword,(err,isMatch)=>{
                    if(err) reject(err);
                    else reslove(isMatch);
                })
            })
        }
    }
    mongoose.model('User', userSchema);   //會自動創建一個名叫users的表
}
module.exports = createUserSchema;