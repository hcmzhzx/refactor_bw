<template>
   <div id="visitor" class="flexv wrap">
      <tab active-color="#3ba1d3" class="nav">
         <tab-item selected @on-item-click="nav()" class="list">
            <span class="flex center txt">全部</span>
         </tab-item>
         <tab-item @on-item-click="nav()" class="list">
            <span class="flex center txt">微信好友</span>
         </tab-item>
         <tab-item @on-item-click="nav()" class="list">
            <span class="flex center txt">微信群聊</span>
         </tab-item>
         <tab-item @on-item-click="nav()" class="list">
            <span class="flex center txt">朋友圈</span>
         </tab-item>
      </tab>
      <!--:class="[essayList.length ? '':'none']"-->
      <scroller class="flexitemv mainbox tab-container" @on-pullup-loading="load" lock-x use-pullup :pullup-config="pullupConfig" v-model="Value">
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
         <!--<div class="flexitemv center undata">
         <div class="icon"><img src="../../static/image/un_visitor.png" class="fitimg"></div>
         <p class="flex center text">暂无相关访客,赶快去分享文章吧~</p>
         <a href="javascript:;" class="flex center btn">返回文章库</a>
      </div>-->
      </scroller>
   </div>
</template>

<script>
   import {Tab, TabItem, Loading, Scroller, LoadMore} from 'vux'

   export default {
      name: 'visitor',
      components: {
         Tab, TabItem, Loading, Scroller, LoadMore
      },
      data(){
         return {


            show: false,
            text: '加载中...',
            page: 1,
            Value: {
               pullupStatus: 'default'
            },
            pullupConfig: {
               content: '上拉加载更多',
               downContent: '松开进行加载',
               upContent: '上拉加载更多',
               loadingContent: '加载中...'
            }
         }
      },
      created(){

      },
      methods: {
         // tab切换
         nav(){

         },

         // 分页
         load(){

         }
      }
   }
</script>
