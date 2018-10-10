<template>
   <div id="read" class="flexv wrap">
      <div class="between bg_white head">
         <div class="flex user">
            <div class="userImg"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="aroundv">
               <p class="flexv name">小胡同志</p>
               <span class="flex time">2018-09-17</span>
            </div>
         </div>
         <a href="javascript:;" class="flex center analysis">用户分析<i class="flex center bw bw-right"></i></a>
      </div>

      <div class="flexitemv mainbox tab-container">
         <tab active-color="#3ba1d3" custom-bar-width="6rem" class="nav">
            <tab-item selected @on-item-click="" class="flex center list">
               <span class="flex center txt">当天浏览</span>
            </tab-item>
            <tab-item @on-item-click="" class="flex center list">
               <span class="flex center txt">其他时间</span>
            </tab-item>
         </tab>

         <mescroll v-show="current" class="flexitemv mainbox" ref="myScroller" :up="mescrollUp" @init="mescrollInit">
            <div class="flexv bg_white lists">
               <a href="javascript:;" class="between bg_white list">
                  <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
                  <div class="flexitemv cont">
                     <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                     <span class="flex base">来自朋友圈</span>
                  </div>
               </a>

               <div class="between record_time">
                  <div class="flexitemv time_lists">
                     <div class="between list"><span class="flex">10:00</span><span class="flex">阅读143S</span></div>
                     <div class="between list"><span class="flex">10:00</span><span class="flex">阅读143S</span></div>
                  </div>
                  <i class="flex line"></i>
                  <div class="aroundv total">
                     <span class="flex center time">188S</span>
                     <i class="flex center date">2018-09-17</i>
                  </div>
               </div>
               <a href="javascript:;" class="flex center unfold">
                  <span class="flex">展开剩余<i>1</i>条记录</span><i class="flex center bw bw-down"></i>
               </a>
            </div>
         </mescroll>
         <default :config="config" v-show="!current"></default>
         <!--<div class="flexitemv center undata" v-else>
            <div class="icon"><img src="../../static/image/default-icon.png" class="fitimg"></div>
            <p class="flex center text">暂无相关阅读信息</p>
         </div>-->
      </div>
   </div>
</template>

<script>
   import Default from './module/default'
   import Mescroll from 'mescroll.js/mescroll'
   import {Tab, TabItem} from 'vux'

   export default {
      name: 'read',
      components: {
         Default, Mescroll, Tab, TabItem
      },
      data(){
         return{
            readList:['1'],

            current: false,
            config: {
               code: 0, // 0 loading, -1 空/服务器错
               text: '',
            },

            mescroll: null,
            mescrollUp: {
               callback: this.upCallback,
               page: {
                  num: 0,
                  size: 5,
               },
               moMoreSize: 3,
               toTop: {
                  src: '../../static/image/totop.png',
                  offset:2000
               }
            },
         }
      },
      methods:{
         // 初始化
         mescrollInit (mescroll) {
            this.mescroll = mescroll
         },
         //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
         upCallback(page, mescroll){

            this.current = true;
            this.config.code = 2;

            mescroll.endErr();

            /*this.$http.get(`profit/cash?include=user&page=${page.num}`).then(res=>{
               if (page.num == 1) {this.readList = []}

               if (res.data.length==0) {
                  mescroll.endErr();
                  this.current = false;
                  this.config = {
                     code: -1,
                     icon: '../../static/image/default-icon.png',
                     text: '暂无相关阅读信息',
                     routeName: 'index',
                     routeText: '返回首页'
                  }
               } else {
                  this.readList.push(...res.data);
                  this.$nextTick(() => {
                     mescroll.endSuccess(res.data.length);
                  });

                  this.current = true;
                  this.config.code = 2;
               }
            }).catch(() => {
               mescroll.endErr();
               this.current = false;
               this.config = {
                  code: -1,
                  icon: '../../static/image/server_err.png',
                  text: '服务器崩溃啦',
                  routeName: '/',
                  routeText: '刷新一下试试'
               }
            })*/
         }
      }
   }
</script>
