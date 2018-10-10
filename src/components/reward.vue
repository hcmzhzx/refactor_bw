<template>
   <div id="reward" class="flexv mainbox wrap" @scroll="roll">
      <div class="flexv head">
         <div class="flexv today">
            <a href="javascript:;" class="twinkle flex endvc">如何推广?</a>
            <h2 class="flex center number">+{{profitList.today_profit}}</h2>
            <span class="flex center txt">今日收益</span>
         </div>
         <div class="aroundh bg_white past">
            <div class="flexv center total">
               <span class="flex num">{{profitList.total_profit}}</span>
               <span class="flex">累计收益</span>
            </div>
            <i class="flex line"></i>
            <div class="flexv center deposit">
               <span class="flex num">{{profitList.available_profit}}</span>
               <span class="flex">可提现</span>
            </div>
         </div>
      </div>
      <div class="sticky">
         <sticky scroll-box="reward" :check-sticky-support="false">
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
         </sticky>
      </div>

      <div v-if="referrerList.length" class="tab-container myScroller">
         <div class="between bg_white item" v-for="item in referrerList" :key="item.id">
            <div class="flex left">
               <div class="userImg"><img :src="item.avatar" class="radimg"></div>
               <div class="aroundv info">
                  <p class="flexv name">{{item.nickname}}</p>
                  <span class="flex">注册：{{item.created_at}}</span>
                  <span class="flex" v-if="item.member_up_at">开通：{{item.member_up_at}}</span>
                  <span class="flex" v-else>开通：未开通</span>
               </div>
            </div>
            <div class="flex money">+10.30</div>
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
         <!--<div class="between bg_white item">
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
         </div>-->
      </div>
      <!--缺省提示页-->
      <default :config="config" v-else></default>
      <load-more v-if="loadBtn" :show-loading="more" :tip="T" background-color="#fbf9fe"></load-more>
   </div>
</template>

<script>
   import {Tab, TabItem, Sticky, LoadMore} from 'vux'
   import Default from './module/default'

   export default {
      name: 'reward',
      components: {
         Tab, TabItem, Sticky, LoadMore, Default
      },
      data(){
         return {
            profitList: {
               today_profit: '0.00',    //今日收益
               total_profit: '0.00',    //累计收益
               available_profit: '0.00' //可提收益
            },

            //推荐列表
            referrerList: [],

            config: {
               code: 0, // 0 loading, -1 空/错误
               text: '',
               routeName: '',
               routeText: ''
            },

            total: 0, // 总页数
            page: 1,
            loadBtn: false,
            T: '正在加载',
            more: true,
         }
      },
      created(){
         // 收益
         this.$http.get(`profit`).then(profit => {
            this.profitList = profit;
         });

         // 推广用户列表
         this.$http.get(`profit/extension`).then(res => {
            if (res.data.length == 0) {
               this.config = {
                  code: -1,
                  icon: '../../static/image/default-icon.png',
                  text: '暂无相关推广记录'
               }
            } else {
               this.config.code = 2;
               this.referrerList = res.data;
               this.total = res.total;
            }
         })
      },
      methods: {
         nav(id){

            this.awardList = [];
         },

         // 滚动固定导航栏
         roll(){
            let Stop = this.$('#reward').scrollTop, lh = this.$('#reward').clientHeight, ih = this.$('.myScroller').clientHeight + this.$('.head').clientHeight + this.$('.sticky').clientHeight;
            if (Stop + lh >= ih) {
               if (this.loadBtn) return;
               this.loadBtn = true;
               this.page++;
               this.config.code = 0;
               if (this.page <= this.total) {
                  this.$http.get(`profit/extension?page=${this.page}`).then(res => {
                     console.log(res);
                  })
                  setTimeout(() => {
                     const dom = `<div class="between bg_white item">
                        <div class="flex left">
                           <div class="userImg"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                           <div class="aroundv info">
                              <p class="flexv name">小胡同志小胡同志小胡同志</p>
                              <span class="flex">注册：{{config.code}}</span>
                              <span class="flex">开通：{{config.code}}</span>
                           </div>
                        </div>
                        <div class="flex money">+30.00</div>
                     </div>`;
                     this.$('.myScroller').insertAdjacentHTML('beforeend', dom)

                     console.log(this.page);
                     this.loadBtn = false;
                  }, 1000)
               } else {
                  console.log(this.page);
                  if (this.referrerList.length > 5) {  // 避免数据太少就显示
                     this.T = '我是有底线的';
                     this.loadBtn = true;
                     this.more = false;
                  }
               }
            }
         }
      }
   }
</script>
