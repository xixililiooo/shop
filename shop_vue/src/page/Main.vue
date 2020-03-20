<template>
  <div>
    <div class="main-div">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"/>
    </div>

    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    changeTabbar(active) {
      // console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "shoppingMall" });
          break;
        case 1:
          this.$router.push({ name: "categoryList" });
          break;
        case 2:
          this.$router.push({ name: "cart" });
          break;
        case 3:
          this.$router.push({name:"personal"})
          break;
      }
    },
    changeTabBarActive() {   //根据路由地址，改变active
      this.nowPath = this.$route.path;
      // console.log(this.nowPath);
      if (this.nowPath == "/main/cart") {
          this.active = 2;
      }
      if(this.nowPath == '/main/categoryList'){
        this.active = 1;
      }
      if(/\/personal.*/.test(this.nowPath)){
        this.active = 3;
      }
    }
  },
  // active(){
  //   console.log('active');
  // },
  async created(){
    this.changeTabBarActive();
    //  let responseList = await this.$axios.post('/orders/getOrdersList',{
    //        userid:this.$store.state.userinfo.userid
    //   })
    //  console.log(responseList);
},
};
</script>

<style scoped>
</style>