import {
    MUTATIONS_USERINFO,
    CART_ADD,
    CART_DELETE,
    CART_CHANGE,
    CART_INIT,
    ORDERLIST_INIT
} from './mutations-type'
import axios from '../axios/index'
import {Toast} from 'vant'
let actions_userinfo = ({ commit }, userinfo) => {
    // console.log(username);
    commit(MUTATIONS_USERINFO, userinfo);
}
let actions_cart_add = async ({ commit }, { userid, cartid, count }) => {
    //发送请求，增加数据，重新得到结果，然后修改vuex，更新视图
    try {
        let response = await axios.post('/cart/addCart', {
            userid,
            cartid,
            count
        })
        let {code=401,message,data:newCartList} = response.data;
        if(code==200){
            Toast.success(message);
            newCartList = newCartList.map(item=>{
                item.isCheck =  true;
                return item;
            })
            commit(CART_ADD,newCartList);
        }
    }catch(error){
        Toast.fail('你还未登录');
        console.log(error);
    }
}
let actions_cart_delete = async ({ commit }, {deleteCartList,userid}) => {
    //发送请求，删除数据，重新得到结果，然后修改vuex。更新视图
    try{
        let response = await axios.post('/cart/deleteCart',{
            deleteCartList,
            userid
        })
        let {code=401,message,data:newCartList} = response.data;
        if(code==200){
            // Toast.success(message);
            newCartList = newCartList.map(item=>{
                item.isCheck =  true;
                return item;
            })
            commit(CART_DELETE, newCartList);
        }
    }catch(error){
        Toast.fail('你还未登录');
        console.log(error);
    }
}
let actions_cart_change = async ({commit},{cartId,isadd,changeNum,goodsId})=>{   //修改的是购物车内的商品的id
    try{
        console.log(cartId);
        let count = JSON.parse(localStorage.getItem('cartList')).find(item=>item._id==cartId).count;
        // console.log(parseInt(count)+parseInt(changeNum));
        let response = await axios.post('/cart/changeCart',{
            cartId,
            newCount:isadd?parseInt(count)+parseInt(changeNum):parseInt(count)-parseInt(changeNum)
        })
        let {code=401,message} = response.data;
        if(code==200){
            // Toast.success(message);
            commit(CART_CHANGE,{cartId,isadd,changeNum,goodsId});
        }
    }catch(error){
        Toast.fail('你还未登录');
        console.log(error);
    }
}
let actions_cart_init = async ({commit},userid)=>{
    try{
        let response = await axios.post('/cart/getCartList',{
            userid
        });
        let {code=401,message,data:cartList} = response.data;
        if(code==200){
            // Toast.success(message);
            cartList = cartList.map(item=>{
                item.isCheck =  true;
                return item;
            })
            commit(CART_INIT,cartList);
        }
    }catch(error){
        Toast.fail('你还未登录');
        console.log(error);
    }
}

let actions_ordersList_add = async ({commit},{total,userid,ordersList,status})=>{
    try{
        let response = await axios.post('/orders/addOrders',{
            userid,
            total,
            ordersList,
            status
        })
        let {code=401,message} = response.data;
        if(code==200){
            Toast.success(message);
            let responseList = await axios.post('/orders/getOrdersList',{
                userid
            })
            console.log(responseList);
            let {code=401,message,data:ordersList} = responseList.data;
            if(code==200){
                commit(ORDERLIST_INIT,ordersList)
            }
        }
    }catch(error){
        console.log(error);
    }
}
let actions_ordersList_init = async ({commit},userid)=>{
    try{
        let responseList = await axios.post('/orders/getOrdersList',{
            userid
        })
        console.log(responseList);
        let {code=401,message,data:ordersList} = responseList.data;
        if(code==200){
            commit(ORDERLIST_INIT,ordersList)
        }
    }catch(error){
        console.log(error);
    }
}
export default {
    actions_userinfo,
    actions_cart_add,
    actions_cart_delete,
    actions_cart_change,
    actions_cart_init,
    actions_ordersList_add,
    actions_ordersList_init
}