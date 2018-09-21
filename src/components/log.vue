<template>
   <mescroll id="log" class="flexv wrap">
      <div class="flexv bg_white list">
         <div class="flex centerv account"><i class="flex center bw bw-wx"></i>793538930@qq.com</div>
         <div class="flexv center money">
            <span class="flex num">100.00</span>
            <em class="flex">提现金额</em>
         </div>
         <div class="flexv time">
            <div class="flex centerv apply">申请时间 &nbsp;<em class="flex">2018-09-04 10:00</em></div>
            <div class="flex centerv over">申请时间 &nbsp;<em class="flex">2018-09-04 10:00</em></div>
         </div>
      </div>
      <div class="flexv bg_white list">
         <div class="flex centerv account"><i class="flex center bw bw-zfb"></i>793538930@qq.com</div>
         <div class="flexv center money">
            <span class="flex num">100.00</span>
            <em class="flex">提现金额</em>
         </div>
         <div class="flexv time">
            <div class="flex centerv apply">申请时间 &nbsp;<em class="flex">2018-09-04 10:00</em></div>
            <div class="flex centerv over">申请时间 &nbsp;<em class="flex">2018-09-04 10:00</em></div>
         </div>
      </div>
      <default :config="config"></default>
   </mescroll>
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
            logList:{}, // 记录列表

            config: {
               code: 2, // 0 loading, -1 空/服务器错
               text: '',
            },

            toast: {
               show: false,
               type: '', // 提示类型"success,cancel,warn"
               text: ''
            }

         }
      },
      created(){
         this.$http.get('profit/cash?include=user').then(res=>{
            console.log(res);
         })
      }
   }
</script>
