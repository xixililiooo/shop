import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/page/shoppingMall'
import Register from '@/page/Register'
import Login from '@/page/Login'
import Goods from '@/page/Goods'
import CategoryList from '@/page/CategoryList'
import Cart from '@/page/Cart'
import Main from '@/page/Main'
import Personal from '@/page/personal/personal'
import PersonalInfo from '@/page/personal/children/personalInfo'
import Orders from '@/page/Orders';
import Cut from '@/page/personal/children/cut'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path:'/main',
      name:'main',
      component:Main,
      meta:{
        keepAlive:true
      },
      redirect:'/main/shoppingMall',
      children:[
        {
          path:"shoppingMall",
          name:"shoppingMall",
          component:ShoppingMall,
          meta:{
            keepAlive:true
          },
        },
        {
          path:"categoryList",
          name:"categoryList",
          component:CategoryList,
          meta:{
            keepAlive:true
          },
        },
        {
          path:'cart',
          name:'cart',
          component:Cart,
          meta:{
            keepAlive:true
          },
        },
        {
          path:"personal",
          name:"personal",
          component:Personal,
          meta:{
            keepAlive:true
          },
          children:[
            {
              path:'personalInfo',
              name:"personalInfo",
              component:PersonalInfo
            }
          ]
        }
      ]
    },
    {
      path:"/register",
      name:"register",
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/goods',
      name:'goods',
      component:Goods
    },
    {
      path:"/orders",
      name:"orders",
      component:Orders
    },
    {
      path:"/",
      redirect:"/main"
    },
    {
      path:'/cut',
      name:"cut",
      component:Cut
    }
  ]
})
