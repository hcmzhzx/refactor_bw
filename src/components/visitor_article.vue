<template>
   <div id="visitor_article" class="flexv wrap">
      <div class="flexv tab-container">
         <div class="flexv bg_white lists">
            <a href="javascript:;" class="between bg_white list">
               <div class="img"><img src="https://img.zx85.net/edit/image/jpeg/5b9c760ce6bdd.jpeg" class="fitimg"></div>
               <div class="flexitemv cont">
                  <h2 class="flexitemv">ST因子为什么让你变年轻？</h2>
                  <span class="flex base">2018-09-18 10:00发布</span>
               </div>
            </a>
         </div>
         <tab active-color="#3ba1d3" custom-bar-width="5rem" class="nav">
            <tab-item selected @on-item-click="" class="list">
               <span class="flex center txt">全部</span>
            </tab-item>
            <tab-item @on-item-click="" class="list">
               <span class="flex center txt">微信好友</span>
            </tab-item>
            <tab-item @on-item-click="" class="list">
               <span class="flex center txt">微信群聊</span>
            </tab-item>
            <tab-item @on-item-click="" class="list">
               <span class="flex center txt">朋友圈</span>
            </tab-item>
         </tab>
         <div class="flexitemv mainbox content" v-if="visitorList.length">
            <div class="flexv bg_white list">
               <div class="between friend">
                  <div class="flex user">
                     <div class="cover"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                     <div class="aroundv">
                        <p class="flexv name">小胡同志</p>
                        <span class="flex text">2018-09-18 10:00</span>
                     </div>
                  </div>
                  <a href="javascript:;" class="flex center btn">TA还看了</a>
               </div>
               <div class="between record_time">
                  <div class="flexitemv time_lists">
                     <div class="between time_list"><span class="flex">10:00</span><span class="flex">阅读143S</span></div>
                  </div>
                  <i class="flex line"></i>
                  <div class="aroundv total">
                     <span class="flex center time">188S</span>
                     <i class="flex center date">2018-09-17</i>
                  </div>
               </div>
            </div>
            <div class="flexv bg_white list">
               <div class="between friend">
                  <div class="flex user">
                     <div class="cover"><img src="../../static/image/zxj.jpg" class="radimg"></div>
                     <div class="aroundv">
                        <p class="flexv name">小胡同志</p>
                        <span class="flex text">2018-09-18 10:00</span>
                     </div>
                  </div>
                  <a href="javascript:;" class="flex center btn">TA还看了</a>
               </div>
               <div class="between record_time">
                  <div class="flexitemv time_lists">
                     <div class="between time_list"><span class="flex">10:00</span><span class="flex">阅读143S</span></div>
                     <div class="between time_list"><span class="flex">10:00</span><span class="flex">阅读143S</span></div>
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
         </div>
         <div class="flexitemv center undata" v-else>
            <div class="icon"><img src="../../static/image/default-icon.png" class="fitimg"></div>
            <p class="text">暂无相关访客信息~</p>
         </div>
      </div>
   </div>
</template>

<script>
   import {Tab, TabItem, Loading} from 'vux'

   export default {
      name: 'visitor_article',
      components: {
         Tab, TabItem, Loading
      },
      data(){
         return{
            visitorList:['1'],
         }
      }
   }
</script>
