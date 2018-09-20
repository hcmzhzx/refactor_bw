<template>
   <div id="reward" class="flexv mainbox wrap">
      <div class="flexv head">
         <div class="flexv today">
            <a href="javascript:;" class="twinkle flex endvc">如何推广?</a>
            <h2 class="flex center number">+0.00</h2>
            <span class="flex center txt">今日收益</span>
         </div>
         <div class="aroundh bg_white past">
            <div class="flexv center total">
                <span class="flex num">0.00</span>
                <span class="flex">累计收益</span>
            </div>
            <i class="flex line"></i>
            <div class="flexv center deposit">
               <span class="flex num">0.00</span>
               <span class="flex">累计收益</span>
            </div>
         </div>
      </div>

      <tab active-color="#3ba1d3" custom-bar-width="5rem" class="bg_white nav">
         <tab-item selected @on-item-click="nav()" class="flexv center list">
            <span class="flex center txt">总推荐</span>
            <span class="flex center num">199</span>
         </tab-item>
         <tab-item @on-item-click="nav()" class="flexv center list">
            <span class="flex center txt">已开通</span>
            <span class="flex center num">55</span>
         </tab-item>
         <tab-item @on-item-click="nav()" class="flexv center list">
            <span class="flex center txt">未开通</span>
            <span class="flex center num">144</span>
         </tab-item>
      </tab>

      <mescroll v-show="current" class="flexitemv mainbox tab-container" ref="myScroller" :up="mescrollUp" @init="mescrollInit">
         <div class="between bg_white item">
            <div class="flex left">
               <div class="userImg"><img src="../../static/image/zxj.jpg" class="radimg"></div>
               <div class="aroundv info">
                  <p class="flexv name">小胡同志小胡同志小胡同志</p>
                  <span class="flex">注册：{{config.code}}</span>
                  <span class="flex">开通：{{config.code}}</span>
               </div>
            </div>
            <div class="flex money">+0.30</div>
         </div>
         <div class="between bg_white item second">
            <div class="flex left">
               <div class="userImg"><img src="../../static/image/zxj.jpg" class="radimg"></div>
               <div class="aroundv info">
                  <p class="flexv name">小胡同志小胡同志小胡同志</p>
                  <span class="flex">注册：{{config.code}}</span>
                  <span class="flex">开通：{{config.code}}</span>
               </div>
            </div>
            <div class="flex money">+0.30</div>
         </div>
      </mescroll>

      <!--缺省提示页-->
      <default :config="config"></default>
   </div>
</template>

<script>
   import {Tab, TabItem} from 'vux'
   import Default from './module/default'
   import Mescroll from 'mescroll.js/mescroll'

   export default {
      name: 'reward',
      components: {
         Tab, TabItem, Default, Mescroll
      },
      data(){
         return{
            awardList:[],

            current: false,
            config: {
               code: 0, // 0 loading, -1 空/错误
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
         this.current = true;
         this.config={
            code:2,
            icon:'../../static/image/default-icon.png',
            text:'暂无相关推广记录'
         }
      },
      methods:{
         nav(id){

            this.awardList = [];
            this.mescroll.resetUpScroll();  // 刷新列表数据
         },
         // 初始化
         mescrollInit (mescroll) {
            this.mescroll = mescroll
         },
         //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
         upCallback(page, mescroll){
            setTimeout(()=>{
               if(this.awardList.length<6){
                  console.log(mescroll);
                  mescroll.endErr();
               }
            },1000)
         }
      }
   }
</script>
