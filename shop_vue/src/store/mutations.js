import {
    MUTATIONS_CLEARUSERINFO,   //把用户信息写入vuex
    MUTATIONS_USERINFO, //清除用户信息
    CART_ADD, //增加购物车商品
    CART_DELETE, //删除购物车商品
    CART_CHANGE,
    CART_INIT,
    ORDERLIST_INIT
}  from './mutations-type'
export default{
    [MUTATIONS_USERINFO](state,userinfo){
        state.userinfo = userinfo;
    },
    [MUTATIONS_CLEARUSERINFO](state){
        // console.log('执行清空');
        localStorage.removeItem('token');
        localStorage.removeItem('userinfo');
        localStorage.removeItem('cartList');
        localStorage.removeItem('ordersList');
        state.userinfo = {};
        state.cartList = [];
        state.ordersList = [];
    },
    [CART_ADD](state,newCartList){  //newCartList为新的购物车列表
        localStorage.setItem('cartList',JSON.stringify(newCartList));
        state.cartList = [...newCartList];
    },
    [CART_DELETE](state,newCartList){ //newCartList为新的购物车列表
        localStorage.setItem('cartList',JSON.stringify(newCartList));
        state.cartList = [...newCartList];
    },
    [CART_CHANGE](state,{cartId,isadd,changeNum,goodsId}){  //改变购物车内商品的数量
        let cartList = JSON.parse(localStorage.getItem('cartList'));
        let index = cartList.findIndex(item=>item._id == cartId);
        if(isadd){
            cartList[index].count=parseInt(cartList[index].count)+changeNum;
            state.cartList[index].count=parseInt(state.cartList[index].count)+changeNum;
        }else{
            cartList[index].count=parseInt(cartList[index].count)-changeNum;
            state.cartList[index].count=parseInt(state.cartList[index].count)-changeNum;
        }
        localStorage.setItem('cartList',JSON.stringify(cartList));
    },
    [CART_INIT](state,cartList){
        localStorage.setItem('cartList',JSON.stringify(cartList));
        state.cartList = [...cartList];
    },
    [ORDERLIST_INIT](state,ordersList){
        localStorage.setItem('ordersList',JSON.stringify(ordersList));
        state.ordersList = [...ordersList];
    }
}