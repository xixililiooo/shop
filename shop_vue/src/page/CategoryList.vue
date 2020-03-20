<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表" />
    </div>

    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                :class="{categoryActice:categoryIndex==index}"
                v-for="(item , index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>

          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], //小类类别
      active: 0, //激活标签的值
      loading: false,
      finished: false, //上拉加载是否有数据
      page: 1, //商品列表的页数
      goodList: [], //商品列表信息
      categorySubId: "", //商品子类ID
      isRefresh: false, //下拉刷新
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"'
    };
  },
  methods: {
    async getCategory() {
      let response = await this.$axios.get("/goods/getCategoryList");
      let { code, message } = response.data;
      if (code == 200) {
        //   console.log('message',message);
        this.category = message;
        this.getCategorySubByCategoryId(this.category[0].ID);
      } else {
        Toast.fail("获取列表数据错误");
      }
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      // console.log(categoryId);
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    goGoodsInfo(id) {
        console.log(id);
        this.$router.push({name:'goods',params:{goodsId:id}})
    },
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodsList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    async getCategorySubByCategoryId(categoryId) {
      let response = await this.$axios.post("/goods/getCategorySubList", {
        categoryId
      });
      let { code, message } = response.data;
      if (code == 200 && message.length) {
        this.categorySub = message;
        this.active = 0;
        this.categorySubId = this.categorySub[0].ID;
        this.onLoad();
      } else {
        Toast.fail("服务器出错");
      }
    },
    async getGoodsList() {
      let response = await this.$axios.post(
        "/goods/getGoodsListByCategorySubID",
        {
          categorySubId: this.categorySubId,
          page: this.page
        }
      );
      let { code, message } = response.data;
      if (code == 200 && message.length) {
        this.page++;
        this.goodList = this.goodList.concat(message);
      } else if (message.length == 0) {
        this.finished = true;
      } else {
        Toast.fail("获取子列表数据错误");
      }
      this.loading = false;
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let clientHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav") && (document.getElementById("leftNav").style.height = clientHeight - 46 - 50 + "px");
    document.getElementById("list-div")&& (document.getElementById("list-div").style.height =
      clientHeight - 90 - 50 + "px");
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActice {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>