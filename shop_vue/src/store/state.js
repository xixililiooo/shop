export default{
    //购物车数据
    cartList:localStorage.getItem('cartList')?JSON.parse(localStorage.getItem('cartList')):[],
    //用户信息
    userinfo:localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):{},
    shoppingAddress:[],
    ordersList:localStorage.getItem('ordersList')?JSON.parse(localStorage.getItem('ordersList')):[],
}