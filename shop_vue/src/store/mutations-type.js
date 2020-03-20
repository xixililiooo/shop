const MUTATIONS_USERINFO = "MUTATIONS_USERINFO"; //登录成功后写入用户信息
const MUTATIONS_CLEARUSERINFO = "MUTATIONS_CLEARUSERINFO" ; //清楚用户信息
const CART_ADD = "CART_ADD";  //购物车增加商品
const CART_DELETE = "CART_DELETE"; //购物车删除商品
const CART_CHANGE = "CART_CHANGE"; //购物车内商品数量的改变
const CART_INIT = "CART_INIT";  //重新登录的时候对购物车进行初始化，后续登录状态下使用本地缓存
const ORDERLIST_INIT = "ORDERLIST_INIT"  //添加订单
export {
    MUTATIONS_USERINFO,
    MUTATIONS_CLEARUSERINFO,
    CART_ADD,
    CART_DELETE,
    CART_CHANGE,
    CART_INIT,
    ORDERLIST_INIT
}