<template>
    <div v-if="!this.$store.state.userinfo.userid" class="defaultImage">
      <img src="@/assets/images/cart/empty.png" alt="未登录">
      <div>你还未登录</div>
    </div>
    <div v-else-if="this.$store.state.userinfo.userid&&!this.$store.state.cartList.length" 
    class="defaultImage"
    >
      <img src="@/assets/images/cart/empty.png" alt="购物车为空">
      <div>购物车内没有东西喔</div>
    </div>
  <div v-else>
    <div class="navbar-div">
      <van-nav-bar title="购物车" right-text="删除" @click-right="deleteCardHandle" />
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <div class="pang-row" v-for="(item,index) in cartList" :key="index">
        <van-cell>
          <template slot="icon">
            <van-checkbox v-model="item.isCheck" checked-color="#45c763" @click="chanelItem(item)"></van-checkbox>
          </template>
          <template slot="title">
            <van-card tag :price="item.PRESENT_PRICE" desc :title="item.NAME" :thumb="item.IMAGE1">
              <template slot="num">
                <van-stepper :value="item.count" @plus="plusNum(item)" @minus="minusNum(item)" />
              </template>
            </van-card>
          </template>
        </van-cell>
      </div>
    </div>

    <!--显示总金额-->

    <van-submit-bar :price="totalMoney" button-text="提交订单" style="marginBottom:60px" @submit="submitHandle">
      <van-checkbox v-model="isCheckedAll" checked-color="#45c763" @click="changeSelect">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { toMoney } from "@/filter/moneyFilter.js";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      isCheckedAll: true
    };
  },
  created() {
    // this.getCartInfo();
    // console.log(this.$store.state.cartInfo);
    // console.log(this.cartList);
  },
  computed: {
    ...mapState({
      cartList: state => state.cartList,
      isEmpty: state => state.cartList.length == 0  //购物车是否为空
    }),
    totalMoney() {
      // console.log("计算价格");
      let allMoney = 0;
      this.cartList
        .filter(item => item.isCheck == true)
        .forEach((item, index) => {
          allMoney += item.PRESENT_PRICE * item.count;
        });
      // localStorage.cartList = JSON.stringify(this.cartList);
      return allMoney * 100;
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    deleteCardHandle() {
      Dialog.confirm({
        message: "确定删除所选商品吗？"
      }).then(() => {
          let deleteCartList = this.cartList.filter(item=>item.isCheck);
          deleteCartList = deleteCartList.map(item=>item._id);
          let userid = this.$store.state.userinfo.userid;
          this.$store.dispatch('actions_cart_delete',{deleteCartList,userid});
      });
    },
    plusNum(item) {
      console.log("zhixingjaifa");
      // item.count++;
      this.$store.dispatch('actions_cart_change',{cartId:item._id,isadd:true,changeNum:1,goodsId:item.ID});
    },
    minusNum(item) {
      this.$store.dispatch('actions_cart_change',{cartId:item._id,isadd:false,changeNum:1,goodsId:item.ID});
      // item.count--;
    },
    changeSelect() {
      this.isCheckedAll = !this.isCheckedAll;
      this.cartList.forEach(item => {
        item.isCheck = this.isCheckedAll;
      });
    },
    chanelItem(item) {
      item.isCheck = !item.isCheck;
      this.isCheckedAll = this.cartList.every(item => item.isCheck == true);
    },
    submitHandle(){
      // console.log('x')
      let userid = this.$store.state.userinfo.userid;
      let total = this.totalMoney/100;
      let status = 1;
      let ordersList = this.cartList.filter(item=>item.isCheck);
      this.$store.dispatch('actions_ordersList_add',{   //增加订单的同时也要删除购物车中相应的商品
        userid,
        total,
        status,
        ordersList
      })
      let deleteCartList = ordersList.map(item=>item._id);
      this.$store.dispatch('actions_cart_delete',{deleteCartList,userid});
    }
  }
};
</script>

<style scoped lang="stylus">
.defaultImage
  width 100%
  img
    width 100%
  div
    text-align center
</style>