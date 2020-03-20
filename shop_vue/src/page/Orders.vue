<template>
  <div>
    <van-nav-bar title="订单中心" left-text="返回" left-arrow
        @click-left="back"
    >
             <van-icon name="search" slot="right" />
    </van-nav-bar>
    <van-tabs v-model="active" sticky>
        <van-tab title="全部">
            <ordersList :ordersList="ordersList">

            </ordersList>
        </van-tab>
  <van-tab title="未支付">
           <ordersList :ordersList="ordersList">
                
            </ordersList>
  </van-tab>
  <van-tab title="已支付">
           <ordersList :ordersList="ordersList">
                
            </ordersList>
  </van-tab>
  <van-tab title="已收货">
           <ordersList :ordersList="ordersList">
                
            </ordersList>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import ordersList from '@/components/ordersList'
import {mapState} from 'vuex'
export default {
    components:{
        ordersList
    },
  data() {
    return {
        active:0
    };
  },
  computed: {
    ...mapState({
      ordersList:(state)=>state.ordersList
    })
  },
  watch: {
    // active(newIndex){
    //   this.filterOrdersList(newIndex);
    // }
  },
  created() {
    //   console.log(this.$route.params.index);
      // let {index} = this.$route.params;
      // // console.log(index);
      // this.active = index;
      // this.filterOrdersList(index); 
  },
  methods: {
      back(){
          this.$router.go(-1);
      },
      filterOrdersList(index){
        switch(index){
        case 1:
          // console.log('xx');
          // console.log(this.ordersList.filter((item)=>item.status=="0"));
          this.ordersList = this.ordersList.filter((item)=>item.status=="0");  //没有支付的订单
          break;
        case 2:
          this.ordersList = this.ordersList.filter((item)=>item.status=="1");  //已经支付的订单
          break;
      }
      }
  },
};
</script>

<style lang="stylus" scoped>
</style>