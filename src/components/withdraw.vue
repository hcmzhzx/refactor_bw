<template>
   <div id="withdraw" class="flexv wrap">
      <form class="flexitemv" @submit.prevent="sendForm" v-show="current">
         <div class="between bg_white top">
            <div class="flex center left" v-if="withdraw.is_wechat"><i class="flex center bw bw-bonus"></i>微信红包提现</div>
            <div class="flex center left" velse><i class="flex center bw bw-caution"></i>微信红包提现尚未完善</div>
            <i class="flex center bw bw-right"></i>
         </div>
         <div class="between bg_white middle">
            <i class="flex center yen">&yen;</i>
            <input type="tel" name="money" maxlength='3' autocomplete="off" class="flexitem money" v-model="money" placeholder="请输入提现金额"/>
            <i class="flex center bw bw-del" @click="money=''" v-if="money>0"></i>
            <a href="javascript:;" class="flex center max" @click="max">最大</a>
         </div>
         <div class="between bg_white footer" v-if="withdraw.balance>=money">
            <div class="flex center left">当前可提现余额为{{withdraw.balance}}元</div>
            <a href="javascript:;" @click="$router.push({name:'log'})" class="flex center right">查看提现记录<i class="flex center bw bw-right"></i></a>
         </div>
         <div class="between bg_white footer deficiency" v-else>余额可用额度不足</div>
         <div class="flexv center submitbox">
            <p class="hint">当前提现方式最大单次提现200</p>
            <button type="submit" :class="['flex','center','submit',{'deficiency':withdraw.balance<money || money=='' || money==0 || !/^[1-9]\d{0,2}$/.test(this.money.trim())}]">提交申请</button>
         </div>
         <!--提示框-->
         <toast v-model="toast.show" :type="toast.type">{{toast.text}}</toast>
      </form>
      <default :config="config"></default>
   </div>
</template>

<script>
   import Default from './module/default'
   import {Toast} from 'vux'

   export default {
      name: 'withdraw',
      components: {
         Default, Toast
      },
      data(){
         return {
            money: '',

            withdraw: {
               is_wechat: 0,
               balance: 100
            },

            current: true,
            config: {
               code: 0, // 0 loading, -1 空/服务器错
               icon: '', // 提示图片
               text: ''
            },

            toast: {
               show: false,
               type: '', // 提示类型"success,cancel,warn"
               text: ''
            }
         }
      },
      created(){
         setTimeout(() => {
            this.config.code = 2
         }, 500)
      },
      methods: {
         //最大
         max(){
            this.money = 200;
         },
         // 提交
         sendForm(e){

            const ele = e.target.querySelector('input'), name = ele.getAttribute('name'), post = {}, sum = Number(ele.value);
            if (e.target.querySelector('button').classList.contains('deficiency')) return;
            if(Number.isInteger(sum)){
               post[name] = sum;
               setTimeout(() => {
                  console.log(post);
                  this.toast = {
                     show: true,
                     type: 'success',
                     text: '提交成功'
                  }
               }, 600)
            } else {
               this.toast = {
                  show: true,
                  type: 'warn',
                  text: '必须为整数'
               }
            }
         }
      }
   }
</script>
