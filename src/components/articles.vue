<template>
   <div id="articles" class="flexv wrap">
      <div class="flexitemv">
         <tab active-color="#3ba1d3" custom-bar-width="60px" class="flex nav">
            <tab-item selected @on-item-click="nav()" class="list">
               <span class="flex center txt">我的文章</span>
            </tab-item>
            <tab-item @on-item-click="nav()" class="list">
               <span class="flex center txt">我的创作</span>
            </tab-item>
         </tab>
         <Mescroll v-show="!show" class="flexitemv mainbox tab-container" ref="myScroller" :up="mescrollUp" @init="mescrollInit">
            <div class="flexitemv content box2" v-if="articlesList.length">
               <div class="flexv bg_white lists">
                  <a href="javascript:;" class="between bg_white list">
                     <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
                     <div class="flexitemv cont">
                        <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                        <span class="flex base">2018-9-04 10:00发布</span>
                     </div>
                  </a>
                  <div class="between visitor">
                     <div class="flex user">
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                     </div>
                     <div class="new_vistor">有新的访客</div>
                     <a href="javascript:;" class="flex more">查看更多访客&nbsp;></a>
                  </div>
                  <div class="aroundh btnbox">
                     <a href="javascript:;" class="flex center share">分享文章</a>
                     <i class="flex line"></i>
                     <a href="javascript:;" class="flex center check">查看访客</a>
                  </div>
               </div>
               <div class="flexv bg_white lists">
                  <a href="javascript:;" class="between bg_white list">
                     <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
                     <div class="flexitemv cont">
                        <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                        <span class="flex base">2018-9-04 10:00发布</span>
                     </div>
                  </a>
                  <div class="between visitor">
                     <div class="flex user">
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                        <div class="img"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                     </div>
                     <a href="javascript:;" class="flex more">查看更多访客&nbsp;></a>
                  </div>
                  <div class="aroundh btnbox">
                     <a href="javascript:;" class="flex center share">分享文章</a>
                     <i class="flex line"></i>
                     <a href="javascript:;" class="flex center check">查看访客</a>
                  </div>
               </div>
            </div>
            <div class="flexitemv center undata" v-else>
               <div class="icon"><img src="../../static/image/default-icon.png" class="fitimg"></div>
               <p class="flex center text">暂无相关访客,赶快去分享文章吧~</p>
               <a href="javascript:;" class="flex center btn">返回文章库</a>
            </div>
         </Mescroll>
         <loading v-model="show" :text="text" class="flexitemv"></loading>
      </div>
      <div class="aroundh bg_white footer">
         <a href="javascript:;" class="flex center up"><i class="flex center bw bw-up_article"></i><span class="flex center">提交好文章</span></a>
         <i class="flex line"></i>
         <a href="javascript:;" class="flex center write"><i class="flex center bw bw-writing"></i><span class="flex center">开始写文章</span></a>
      </div>
   </div>
</template>

<script>
   import {Tab, TabItem, Loading, LoadMore} from 'vux'
   import Mescroll  from 'mescroll.js/mescroll'

   export default {
      name: 'articles',
      components: {
         Tab, TabItem, LoadMore, Loading, Mescroll
      },
      data(){
         return{
            articlesList:[],  // 文章列表

            show:false,
            text:'加载中...',

            mescroll:null,
            mescrollUp:{
               callback:this.upCallback,
               page:{
                  num:0,
                  size:10,
               },
               moMoreSize:6,
               toTop:{
                  src:'../../static/image/totop.png',
                  offset:1800,
               },
               empty: { //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                  warpId: ".tab-container", //父布局的id (1.3.5版本支持传入dom元素)
                  icon: "../../static/image/default-icon.png", //图标,默认null,支持网络图
                  tip: "暂无相关数据~" //提示
               }
            }
         }
      },
      // 回到离开时的位置
      beforRouteEnter(to, from, next){
         next(vm=>{
            vm.$refs.myScroller.beforRouteEnter()
         })
      },
      // 记录离开时的位置
      beforRouteLeave(to, from, next){
         next(vm=>{
            vm.$refs.myScroller.beforRouteLeave()
            next()
         })
      },
      created(){
         this.show = true;

      },
      methods:{
         nav(){

         },

         mescrollInit(mescroll){
            this.mescroll = mescroll
         },
         //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
         upCallback(page, mescroll){
            /*this.$http.get(`articles?cid=${this.cid}&page=${page.num}`).then(res => {
               if(page.num == 1){ this.articlesList = [] }
               this.articlesList.push(...res.data.data);
               this.$nextTick(() => {
                  mescroll.endSuccess(res.data.data.length);
               })
            }).catch((e)=>{
               mescroll.endErr()
            })*/
         }
      }
   }
</script>
