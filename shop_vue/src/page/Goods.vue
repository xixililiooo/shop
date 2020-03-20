<template>
<div>
    <div class="navbar-div">
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
    </div>
    <div class="topimage-div">
        <img :src="goodsInfo.IMAGE1" width="100%"/>
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
        <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">

          </div>
        </van-tab>
        <van-tab title="评价">
            正在制作中
        </van-tab>
        </van-tabs>

    </div>
    

    <van-goods-action>
  <van-goods-action-icon
    icon="chat-o"
    text="客服"
    dot
  />
  <van-goods-action-icon
    icon="cart-o"
    :info="goodsCount"
    text="购物车"
    @click="switchToCart"
  />
  <van-goods-action-button
    text="加入购物车"
    type="warning"
    @click="addGoodsToCart"
  />
  <van-goods-action-button
    type="primary"
    text="立即购买"
  />
</van-goods-action>
</div>
</template>

<script>
import { Toast, Card } from 'vant'
import {toMoney} from '@/filter/moneyFilter.js'
import {mapState} from 'vuex'
export default {
filters:{
    moneyFilter(money){
        return toMoney(money);
    }
},
  data() {
    return {
      goodsId: "",
      goodsInfo:{},   //商品详细数据
    };
  },
  computed: {
    ...mapState({
      goodsCount:(state)=>{   //统计商品全部的数量
        return state.cartList.reduce((pre,item)=>pre+parseInt(item.count),0);
      }
    })
  },
  created() {
    this.goodsId= this.$route.query.goodsId ?this.$route.query.goodsId : this.$route.params.goodsId
    this.getInfo();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    async getInfo() {
      let response = await this.$axios.post("/goods/getGoodsInfo", {
        goodsId: this.goodsId
      });
      let { code, message } = response.data;
      console.log(message);
      if(code == 200){
          this.goodsInfo = message;
      }else{
          Toast.fail('获取服务器数据失败');
      }
    },
    addGoodsToCart(){  //将商品添加到购物车中
      let cartid = this.goodsId;   //添加的商品id
        let cartList = this.$store.state.cartList;
        if(cartList.find((item)=>item.ID==cartid)){
            Toast.success('该物品已经在购物车中啦');
        }
        let {userid} = this.$store.state.userinfo;
        let count = 1;
        this.$store.dispatch('actions_cart_add',{
          userid,
          cartid,
          count
        })
    },
    switchToCart(){  //跳转到购物车页面
        this.$router.push({
          name:"cart"
        })
    }
  }
};
</script>

<style scoped>
 .goods-name{
        background-color: #fff;
    } 
    .goods-price{
        background-color: #fff;
    }
    .detail {
        font-size:0px;
    }

</style>