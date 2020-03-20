<template>
    <div>
        <van-search
  v-model="value"
  shape="round"
  background="#4fc08d"
  placeholder="请输入搜索关键词"
  
/>
        <div class="swiper-area">
            <van-swipe :autoplay="3000"> 
                <van-swipe-item v-for="(item,index) in adList" :key="index">
                    <img v-lazy="item.imgPath" alt="" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="" width="90%" />
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <div class="recommend-area">
            <div class="recommennd-title">
                商品推薦
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption"> 
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" alt="" width="80%" />
                            <div>{{item.goodsName}}</div>
                            <div>
                                {{item.price | moneyFilter }}({{item.mallPrice | moneyFilter}})
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <Floor :floorData="floor1" :floorTitle="floorName.floor1"></Floor>
        <Floor :floorData="floor2" :floorTitle="floorName.floor2"></Floor>
        <Floor :floorData="floor3" :floorTitle="floorName.floor3"></Floor>

        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item , index) in hotGoods" :key="index">
                                <goodsInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">

                                </goodsInfo>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import Floor from '../components/floor'
import goodsInfo from '../components/goodsinfo'
import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        components:{
            Floor,
            goodsInfo
        },
        data(){
            return{
                locationIcon:require('../assets/images/location.png'),
                adList:[
                    {
                        imgPath:require('../assets/images/ad-1.png')
                    },
                    {
                        imgPath:require('../assets/images/ad-1.png')
                    },
                    {
                        imgPath:require('../assets/images/ad-1.png')
                    },
                    {
                        imgPath:require('../assets/images/ad-1.png')
                    }
                ],
                category:[], //商品分類
                adBanner:'',//廣告圖片
                recommendGoods:[],//推薦商品 
                swiperOption:{  
                    slidesPerView:3
                },
                floor1:[],  //樓層1的數據
                floor2:[],  //樓層二的數據
                floor3:[], //樓層三的數據
                floorName:{}, //樓層名稱
                hotGoods:[],  //热卖商品
                value:""  //搜索框的值
            }
        },
        async created() {
            let {status,data:{data:{category,recommend,floor1,floor2,floor3,floorName,hotGoods}}} = await this.$axios.get('/test');
            if(status==200){
                this.category = category;
                this.recommendGoods = recommend;
                this.floor1 = floor1;
                this.floor2 = floor2;
                this.floor3 = floor3;
                this.floorName = floorName;
                this.hotGoods = hotGoods;
            }
        },
    }
</script>

<style lang="stylus" scoped>
.search-bar
    height 2.2rem;
    background-color #3bba63;
    line-height 2.2rem;
    overflow hidden
    .search-input
        width 100%;
        height 1.3rem;
        border-top 0;
        border-bottom 1px solid white !important;
        border-left 0;
        border-right 0;
        background-color #3bba63;
        color #fff;
    .location-icon
        padding 0.3rem
.swiper-area
    clear both;
    overflow hidden
    max-height:8rem;
.type-bar
    background-color: #fff;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size:14px;
    display:flex;
    flex-direction:row;
    flex-wrap:nowrap;
    div
        padding:.3rem;
        font-size:12px;
        text-align: center;
        flex:1;
.recommend-area
    background-color #fff;
    margin-top .3rem;
    .recommennd-title
        border-bottom  1px solid #eee;
        font-size 14px;
        padding .2rem;
        color #e5017d;
    .recommend-body
        border-bottom 1px solid #eee;
        .recommend-item
            width 99%;
            border-right 1px solid #eee;
            text-align center;
            font-size 12px;
.hot-area
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
    .hot-goods
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
</style>