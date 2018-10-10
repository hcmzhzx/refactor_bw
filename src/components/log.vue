<template>
   <div id="log" class="flexv wrap">
      <mescroll v-show="current" class="flexitemv mainbox" ref="myScroller" :up="mescrollUp" @init="mescrollInit">
         <div class="flexv bg_white list" v-for="item in logList">
            <div class="flex centerv account" v-if="item.type==1"><i class="flex center bw bw-wx"></i>{{item.user.account}}</div>
            <div class="flex centerv account" v-else><i class="flex center bw bw-zfb"></i>{{item.user.account}}</div>
            <div class="flexv center money">
               <span class="flex num">{{item.price}}</span>
               <em class="flex">提现金额</em>
            </div>
            <div class="flexv time">
               <div class="flex centerv apply">申请时间 &nbsp;<em class="flex">{{item.created_at}}</em></div>
               <div class="flex centerv over" v-if="item.state=='提现完成'"><span class="flex">到账时间&nbsp;</span><em class="flex">{{item.over_at}}</em></div>
               <div class="flex centerv over" v-else><span class="flex">到账时间&nbsp;</span><em class="flex">{{item.state}}</em></div>
            </div>
         </div>
         <!--<div class="flexv bg_white list">
            <div class="flex centerv account"><i class="flex center bw bw-zfb"></i>793538930@qq.com</div>
            <div class="flexv center money">
               <span class="flex num">100.00</span>
               <em class="flex">提现金额</em>
            </div>
            <div class="flexv time">
               <div class="flex centerv apply"><span class="flex">申请时间&nbsp;</span><em class="flex">2018-09-04 10:00</em></div>
               <div class="flex centerv over"><span class="flex">到账时间&nbsp;</span><em class="flex">正在处理</em></div>
            </div>
         </div>-->
      </mescroll>
      <default :config="config" v-show="!current"></default>
   </div>
</template>

<script>
   import Default from './module/default'
   import Mescroll from 'mescroll.js/mescroll'

   export default {
      name: 'log',
      components: {
         Default, Mescroll
      },
      data(){
         return{
            logList:[], // 记录列表

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
                  offset:1800
               }
            },

            toast: {
               show: false,
               type: '', // 提示类型"success,cancel,warn"
               text: ''
            }

         }
      },
      created(){

      },
      methods:{
         // 初始化
         mescrollInit (mescroll) {
            this.mescroll = mescroll
         },
         //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
         upCallback(page, mescroll){
            this.$http.get(`profit/cash?include=user&page=${page.num}`).then(res=>{
               if (page.num == 1) {this.logList = []}

               if (res.data.length==0) {
                  mescroll.endErr();
                  this.current = false;
                  this.config = {
                     code: -1,
                     icon: '../../static/image/default-icon.png',
                     text: '暂无相关记录~',
                  }
               } else {
                  this.logList.push(...res.data);
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
            })
         }
      }
   }
</script>
