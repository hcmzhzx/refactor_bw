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
         <tab active-color="#3ba1d3" custom-bar-width="60px" class="nav">
            <tab-item selected @on-item-click="" class="list">
               <span class="flex center txt">当天浏览</span>
            </tab-item>
            <tab-item @on-item-click="" class="list">
               <span class="flex center txt">其他时间</span>
            </tab-item>
         </tab>

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
      </div>
   </div>
</template>

<script>
   import {Tab, TabItem} from 'vux'

   export default {
      name: 'read',
      components: {
         Tab, TabItem
      },
   }
</script>
