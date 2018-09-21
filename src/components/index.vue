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

      <mescroll v-show="current" class="flexitemv mainbox tab-container" ref="myScroller" :up="mescrollUp" @init="mescrollInit" :class="[essayList.length ? '':'none']">
         <a href="javascript:;" class="flex bg_white list" v-for="item in essayList" :key="item.id">
            <div class="flexv lists" v-if="item.covers.length==3">
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
      </mescroll>
      <default :config="config"></default>
      <myfooter></myfooter>
   </div>
</template>

<script>
   import Myfooter from './module/my-footer'
   import Default from './module/default'
   import Mescroll from 'mescroll.js/mescroll'
   import {Tab, TabItem, Loading, Toast} from 'vux'

   export default {
      name: 'index',
      components: {
         Myfooter, Tab, TabItem, Default, Mescroll
      },
      data () {
         return {
            selected: '0', //默认分类栏
            userInfo: {    //用户信息
               is_company:0
            },
            navList: {},   //导航栏
            essayList: [], //文章列表
            cid: 1,

            current: false,
            config: {
               code: 0, // 0 loading, -1 空/服务器错
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
         // 获取用户信息
         this.$store.dispatch('user_listing').then(user => {
            this.userInfo = user;

            if(user.is_company!=1){
               this.config = {
                  code: -1,
                  icon: '../../static/image/default-icon.png',
                  text: '您尚未选择公司,请选择后查看',
                  routeName: 'company',
                  routeText: '选择所属公司'
               }
            }
         }).catch(err => {
            this.config = {
               code: -1,
               icon: '../../static/image/server_err.png',
               text: '服务器崩溃啦',
               routeName: 'index',
               routeText: '刷新一下试试'
            }
         })
         // 获取导航栏
         this.$store.dispatch('nav_listing').then(nav => {
            this.navList = nav;
         }).catch(err => {
            this.config = {
               code: -1,
               icon: '../../static/image/server_err.png',
               text: '服务器崩溃啦',
               routeName: 'index',
               routeText: '刷新一下试试'
            }
         })
      },
      methods: {
         // 导航栏切换内容
         nav(id){
            this.$http.get(`articles?cid=${id}`).then(res => {
               this.cid = id;
               this.essayList = [];
               this.mescroll.resetUpScroll();  // 刷新列表数据
            }).catch(err => {
               this.config = {
                  code: -1,
                  icon: '../../static/image/server_err.png',
                  text: '服务器崩溃啦',
                  routeName: 'index',
                  routeText: '刷新一下试试'
               }
            })
         },
         // 初始化
         mescrollInit (mescroll) {
            this.mescroll = mescroll
         },
         //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
         upCallback(page, mescroll){
            const scroll = setInterval(()=>{  // 解决回调太快,数据还没回来
               if(this.userInfo.is_company != 1) return;
               clearInterval(scroll);
               this.$http.get(`articles?cid=${this.cid}&page=${page.num}`).then(res => {
                  if (page.num == 1) {
                     this.essayList = []
                  }
                  if (res.data.length==0) {
                     this.config = {
                        code: -1,
                        icon: '../../static/image/default-icon.png',
                        text: '暂无相关分类文章~',
                        routeName: '/',
                        routeText: '提交好文章'
                     }
                  } else {
                     this.essayList.push(...res.data);
                     this.config.code = 2;
                     this.$nextTick(() => {
                        mescroll.endSuccess(res.data.length);
                     })
                     this.current = true;
                  }
               }).catch((err) => {
                  mescroll.endErr()
                  this.config = {
                     code: -1,
                     icon: '../../static/image/server_err.png',
                     text: '服务器崩溃啦1',
                     routeName: 'index',
                     routeText: '刷新一下试试'
                  }
               })
            },30)
         }
      }
   }
</script>
