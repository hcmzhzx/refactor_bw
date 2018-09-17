<template>
   <div id="index" class="flexv wrap">
      <div class="bg_white header">
         <div class="flex center search">
            <a href="javascript:;" @click="$router.push({name:'search'})" class="flexitem wrap input">
               <i class="flex center bw bw-seek"></i>
               <span class="flexitem centerv wrap">搜索感兴趣的内容</span>
            </a>
            <i class="flex smtxt"></i>
            <a href="javascript:;" class="flex center wrap submit">提交好文章</a>
         </div>

         <tab active-color="#3fa0cc" class="nav">
            <tab-item v-for="(item,index) in navList" :key="item.id" @on-item-click="nav(item.id)" :selected="index==0" class="list">
               <span class="flex center txt">{{item.name}}</span>
            </tab-item>
         </tab>
      </div>
      <!--:class="[userInfo.is_company ? essayList.length:'none']"-->
      <scroller class="flexitemv mainbox tab-container" ref="myScroller" lock-x use-pullup :pullup-config="pullupConfig" @on-pullup-loading="load" v-model="Value" :class="[essayList.length ? '':'none']">
         <!-- v-if="userInfo.is_company"-->
         <div class="flexitemv content box2">
            <div class="flexv item" v-if="essayList.length">
               <a href="javascript:;" class="flex bg_white list" v-for="item in essayList" :key="item.id">
                  <div class="flexv lists" v-if="item.covers">
                     <div class="flexitemv cont">
                        <h2 class="flexitemv">{{item.title}}</h2>
                     </div>
                     <div class="aroundh imgbox">
                        <div class="img" v-for="val in item.covers"><img class="fitimg" :src="val"></div>
                     </div>
                     <div class="flex base">
                        <span class="flex center"><i class="flex center bw bw-check"></i>{{item.view}}</span>
                        <span class="flex center"><i class="flex center bw bw-time"></i>{{item.created_at}}</span>
                     </div>
                  </div>
                  <div class="between lists" v-else>
                     <div class="img">
                        <img class="fitimg" :src="item.cover">
                     </div>
                     <div class="flexitemv cont">
                        <h2 class="flexitemv">{{item.title}}</h2>
                        <div class="flex base">
                           <span class="flex center"><i class="flex center bw bw-check"></i>{{item.view}}</span>
                           <span class="flex center"><i class="flex center bw bw-time"></i>{{item.created_at}}</span>
                        </div>
                     </div>
                  </div>
               </a>
            </div>
            <div class="flexitemv center undata" v-else>
               <div class="icon"><img src="../../static/image/article-icon.png" class="fitimg"></div>
               <p class="text">暂无相关分类文章~</p>
               <a href="javascript:;" class="flex center company">提交好文章</a>
            </div>
         </div>
         <!--没有选公司
         <div class="flexitemv center undata" v-else>
            <div class="icon"><img src="../assets/image/company-icon.png" class="fitimg"></div>
            <p class="text">您尚未选择公司,请选择后查看</p>
            <a href="javascript:;" @click="$router.push({name:'company'})" class="flex center company">选择所属公司</a>
         </div>-->
      </scroller>
      <myfooter></myfooter>
      <loading v-model="show" :text="text"></loading>
   </div>
</template>

<script>
   import myfooter from './module/my-footer'
   import {Tab, TabItem, Loading, Scroller } from 'vux'

   export default {
      name: 'index',
      components: {
         myfooter, Tab, TabItem, Loading, Scroller
      },
      data () {
         return {
            selected: '0', //默认分类栏
            userInfo: {},  //用户信息
            navList: {},   //导航栏
            essayList: [],  //文章列表
            cid:1,

            show:false,
            text:'加载中...',

            page:1,
            Value:{
               pullupStatus:'disabled'  //default, enabled, disabled
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
         this.show = true;
         // 获取用户信息
         this.$store.dispatch('user_listing').then(user => {
            this.userInfo = user;
         });
         // 获取导航栏
         this.$store.dispatch('nav_listing').then(nav => {
            this.navList = nav;
         });
         // 默认获取第一栏文章列表
         this.$http.get('articles?cid=1').then(res => {
            this.essayList = res.data.data;
            this.show = false;
         });
      },
      methods: {
         // 导航栏切换内容
         nav(id){
            this.show = true;
            this.$http.get(`articles?cid=${id}`).then(res => {
               this.essayList = res.data.data;

               this.cid = id;
               this.show = false;
            });
         },

         // 分页
         load(){
            if(this.essayList.length > 9){
               this.Value.pullupStatus = 'enabled'
               let page = this.page+=1;
               this.$http.get(`articles?cid=${this.cid}&page=${page}`).then(res => {
                  this.essayList.push(...res.data.data);
               });
            }
         }
      }
   }
</script>
