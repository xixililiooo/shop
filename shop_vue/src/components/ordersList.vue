<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
      <van-cell-group v-for="(item,index) in ordersList" 
      :key="index"
      class="cellGroup"
      >
  <van-cell title="单元格" v-for="(good,index_) in item.goodsList" :key="index_" >
         <template slot="title">
              <van-card
        :num="good.count"
        :price="good.PRESENT_PRICE"
        desc="描述信息"
        :title="good.NAME"
        :thumb="good.IMAGE1"
      />
         </template>
  </van-cell>
  <van-cell :title="item.status==1?'已支付':'未支付'" :value="'total:'+item.total"></van-cell>
</van-cell-group>
</van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: ["ordersList"],
  data() {
    return {
      count: 0,
      isLoading: false,
      loading: false,
      finished: false
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
    onLoad(){
        this.loading = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
#order_wrapper {
  width: 100%;
  height: 400px;
}
.cellGroup{
  border:1px solid gray;
  border-radius 10px;
  width 90%;
  margin 15px auto;
}
</style>