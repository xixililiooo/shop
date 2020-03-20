const createCategorySub = ()=>{
    const mongoose = require('mongoose');
    let categorySubSchema = mongoose.Schema({
        ID:{unique:true,type:String},
        MALL_CATEGORY_ID:{type:String},
        MALL_SUB_NAME:{type:String},
        COMMENTS:{type:String},
        SORT:{type:Number}
    })
    mongoose.model('CategorySub',categorySubSchema);
}
module.exports = createCategorySub;