<!--
 * @Author: 极客James
 * @Motto: 求知若渴,虚心若愚
 * @Github: https://github.com/Geek-James/ddBuy
 * @掘金: https://juejin.im/user/5c4ebc72e51d4511dc7306ce
 * @LastEditTime : 2020-01-06 15:39:12
 * @Description: 我的
 * @FilePath: /ddBuy/src/views/mine/Mine.vue
 -->
<template>
  <div id="mine">
    <van-nav-bar title="个人中心" :fixed="true" :border="false" style="height:2.5rem" />
    <van-cell-group style="margin-top:2.4rem">
      <van-cell
        style="background-color: #3bba63;color:#FFF;"
        label-class="labelClass"
        is-link
        center
      >
        <template slot="title">
          <!-- 已登录状态 -->
          <div class="personMsg" v-if="userinfo.userid" @click="switchPersonalInfo">
            <img class="iconImage" :src="user_image.login_icon" alt />
            <div class="sex" v-if="userinfo.sex">
              <img :src="user_image.male" alt="女" />
            </div>
            <div class="personInfo" v-if="userinfo.userid">
              <span>{{userinfo.username}}</span>
              <span></span>
            </div>
          </div>
          <!-- 未登录状态 -->
          <div class="personMsg" v-else>
            <img class="iconImage" :src="user_image.noLogin_icon" alt />
            <div class="personInfo">
              <div>你还未登录喔</div>
              <div><router-link to="/login">去登录</router-link></div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 订单相关-->
    <van-cell-group>
      <van-cell title="我的订单" icon="label" value is-link></van-cell>
      <van-grid :border="false">
        <van-grid-item
          v-for="(order,index) in orderData"
          :key="index"
          :icon="order.icon"
          :text="order.title"
          @click="switchOrders(index)"
        />
      </van-grid>
    </van-cell-group>
    <van-cell-group style="margin-top:0.4rem">
      <van-cell title="我的账单" icon="gold-coin" :value="2" is-link />
      <van-cell title="我的订单" icon="todo-list" is-link />
    </van-cell-group>

    <van-cell-group style="margin-top:0.4rem">
      <van-cell is-link icon="vip-card">
        <template slot="title">
          <span class="custom-title">我的购物车</span>
          <van-tag type="danger" :round="true">NEW</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top:0.4rem">
      <!-- 联系客服 -->
      <van-cell title="联系客服" icon="phone" value is-link />
      <!-- 意见反馈 -->
      <van-cell title="意见反馈" icon="comment-circle" is-link />
      <!-- 语言切换 -->
      <van-cell title="语言切换" icon="clock" is-link />
    </van-cell-group>

    <!-- <div class="version">{{$t('mine.version')}}{{version}}</div> -->
    <!--路由的出口-->
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
// // 引入vuex
// import { mapState } from 'vuex'
// import { Dialog, Toast } from 'vant'
// import { _VERSION_ } from './../../config/global'
import { mapState } from "vuex";
export default {
  data() {
    return {
       orderData: [
        { icon: 'cart-circle-o', title: '待支付' },
        { icon: 'gift-o', title: '已支付' },
        { icon: 'smile-comment-o', title: '待收货' },
        { icon: 'cash-back-record', title: '退款/售后' }
      ],
      user_image: {
        login_icon: require("@/assets/images/mine/defaultImg.jpeg"),
        noLogin_icon: require("@/assets//images/login/grey.jpg"),
        female: require("@/assets/images/mine/female.png"),
        male: require("@/assets/images/mine/male.png")
      }
    };
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  methods: {
      switchPersonalInfo(){  //跳转到个人详情页面
          // console.log('tiaozhuan');
          this.$router.push('/main/personal/personalInfo');
      },
      switchOrders(index){
        this.$router.push({
          name:"orders",
          params:{
            index
          }
        })
      }
  },
  created() {
      console.log(this.$store.state.userinfo.userid);
  },
};
</script>

<style lang="stylus" scoped>
#mine {
  width: 100%;
  background-color: #f5f5f5;
  margin-bottom: 3rem;

  .version {
    margin: 0 auto;
    text-align: center;
    font-size: 0.6rem;
    background-color: #ffffff;
    height: 2rem;
    color: grey;
    line-height: 2rem;
  }

  .van-nav-bar {
    background-color: #3bba63;
    font-size: 0.6rem;
  }

  .van-nav-bar__title {
    color: white;
  }

  .personMsg {
    display: flex;
    align-items: center;

    .sex {
      position: absolute;
      top: 3.5rem;
      left: 3.8rem;
      width: 0.1rem;
      height: 0.1rem;

      img {
        width: 1rem;
        height: 1rem;
      }
    }

    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
    }

    .personInfo {
      display: flex;
      flex-direction: column;
      margin-left: 0.8rem;
    }
  }

  .van-cell__left-icon {
    color: #45c763;
    font-size: 1.2rem;
  }

  /* 转场动画 */
  .router-slider-enter-active, .router-slider-leave-active {
    transition: all 0.3s;
  }

  .router-slider-enter, .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
}
</style>
