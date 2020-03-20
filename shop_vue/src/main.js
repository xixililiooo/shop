// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from './axios/index'
import {
  Button,Row,Col,SwipeItem,Swipe,Lazyload,List,Field,NavBar,Toast,Tab,Tabs,PullRefresh,Stepper,Tabbar, TabbarItem,
  Cell,CellGroup,Grid,Tag,GridItem,Radio,RadioGroup,DatetimePicker,Popup,Dialog,
  GoodsAction,GoodsActionIcon,GoodsActionButton,SwipeCell,Card,SubmitBar,Checkbox, Search, Icon, ImagePreview
} from 'vant'
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper);
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List)
.use(Field).use(NavBar).use(Toast).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem)
.use(Cell).use(CellGroup).use(Grid).use(Tag).use(GridItem).use(Radio).use(RadioGroup)
.use(DatetimePicker).use(Popup).use(Dialog).use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
.use(SwipeCell).use(Cell).use(CellGroup).use(Card).use(SubmitBar).use(Checkbox).use(Search).use(Icon).use(ImagePreview)
.use(Search)
/* eslint-disable no-new */
Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
