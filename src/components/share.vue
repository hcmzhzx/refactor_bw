<template>
   <div id="visitor" class="flexv wrap">
      <tab active-color="#3ba1d3" custom-bar-width="6rem" class="nav">
         <tab-item selected @on-item-click="nav()" class="flex center list">
            <span class="flex center txt">全部</span>
         </tab-item>
         <tab-item @on-item-click="nav()" class="flex center list">
            <span class="flex center txt">微信群/好友</span>
         </tab-item>
         <tab-item @on-item-click="nav()" class="flex center list">
            <span class="flex center txt">朋友圈</span>
         </tab-item>
      </tab>
      <mescroll v-show="current" class="flexitemv mainbox tab-container" ref="myScroller" :up="mescrollUp" @init="mescrollInit">
         <div class="flexitemv content box2">
            <div class="flexv bg_white lists new">
               <div class="between top">
                  <div class="flex user">
                     <div class="userImg"><img src="../../static/image/logo.jpg" class="radimg"></div>
                     <div class="cross">
                        <p class="name">测试小胡</p>
                        <p class="time">2018-9-15 10:08</p>
                     </div>
                  </div>
                  <a href="javascript:;" class="flex center analyze">用户分析</a>
               </div>
               <a href="javascript:;" class="between bg_white list">
                  <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
                  <div class="flexitemv cont">
                     <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                     <span class="flex base">来自朋友圈</span>
                  </div>
               </a>
            </div>
            <div class="flexv bg_white lists">
               <div class="between top">
                  <div class="flex user">
                     <div class="userImg"><img src="../../static/image/logo.jpg" class="radimg"></div>
                     <div class="cross">
                        <p class="name">测试小胡</p>
                        <p class="time">2018-9-15 10:08</p>
                     </div>
                  </div>
                  <a href="javascript:;" class="flex center analyze">用户分析</a>
               </div>
               <a href="javascript:;" class="between bg_white list">
                  <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
                  <div class="flexitemv cont">
                     <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                     <span class="flex base">来自朋友圈</span>
                  </div>
               </a>
            </div>
            <load-more :show-loading="false" tip='以下是昨天或更早的记录~' background-color="#fbf9fe"></load-more>
            <div class="flexv bg_white lists">
               <div class="between top">
                  <div class="flex user">
                     <div class="userImg"><img src="../../static/image/logo.jpg" class="radimg"></div>
                     <div class="cross">
                        <p class="name">测试小胡</p>
                        <p class="time">2018-9-15 10:08</p>
                     </div>
                  </div>
                  <a href="javascript:;" class="flex center analyze">用户分析</a>
               </div>
               <a href="javascript:;" class="between bg_white list">
                  <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
                  <div class="flexitemv cont">
                     <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                     <span class="flex base">来自朋友圈</span>
                  </div>
               </a>
            </div>
            <div class="flexv bg_white lists">
               <div class="between top">
                  <div class="flex user">
                     <div class="userImg"><img src="../../static/image/logo.jpg" class="radimg"></div>
                     <div class="cross">
                        <p class="name">测试小胡</p>
                        <p class="time">2018-9-15 10:08</p>
                     </div>
                  </div>
                  <a href="javascript:;" class="flex center analyze">用户分析</a>
               </div>
               <a href="javascript:;" class="between bg_white list">
                  <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
                  <div class="flexitemv cont">
                     <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                     <span class="flex base">来自朋友圈</span>
                  </div>
               </a>
            </div>
         </div>
      </mescroll>
      <default :config="config"></default>
   </div>
</template>

<script>
   import {Tab, TabItem, LoadMore} from 'vux'
   import Default from './module/default'
   import Mescroll from 'mescroll.js/mescroll'

   export default {
      name: 'share',
      components: {
         Tab, TabItem, LoadMore, Default, Mescroll
      },
      data(){
         return {
            visitorList:['1'],

            current: false,
            config: {
               code: 0, // 0 loading, -1 错误信息
               text: '',
               routeName: '',
               routeText: ''
            },

            mescroll: null,
            mescrollUp: {
               callback: this.upCallback,
               page: {
                  num: 0,
                  size: 10,
               },
               moMoreSize: 6,
               toTop: {
                  src: '../../static/image/totop.png',
                  offset:1800
               }
            }
         }
      },
      created(){

         if(this.visitorList.length){
            this.current = true;
            this.config.code = 2;
         } else {
            this.config = {
               code: -1,
               icon: '../../static/image/default-icon.png',
               text: '暂无相关访客,赶快去分享文章吧~',
               routeName: 'index',
               routeText: '返回文章库'
            }
         }

      },
      methods: {
         // tab切换
         nav(){

         },

         // 分页
         mescrollInit(mescroll){
            this.mescroll = mescroll
         },
         //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
         upCallback(page, mescroll){
            /*this.$http.get(`articles?cid=${this.cid}&page=${page.num}`).then(res => {
             if(page.num == 1){ this.essayList = [] }
             this.essayList.push(...res.data.data);
             this.$nextTick(() => {
             mescroll.endSuccess(res.data.data.length);
             })
             }).catch((e)=>{
             mescroll.endErr()
             this.config = {
             code: -1,
             icon: '../../static/image/server_err.png',
             text: '服务器崩溃啦',
             routeName: 'index',
             routeText: '返回首页'
             }
             })*/
         }
      }
   }
</script>
