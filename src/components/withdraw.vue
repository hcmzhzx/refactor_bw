<template>
   <div id="withdraw" class="flexv wrap">
      <form class="flexitemv" @submit.prevent="sendForm" v-if="current">
         <div class="between bg_white top" @click="choice">
            <div class="flex center left" v-if="is_account"><i class="flex center bw bw-caution"></i>{{title}}提现尚未完善</div>
            <div class="flex center left" v-else><i class="flex center bw bw-bonus"></i>{{title}}提现</div>
            <i class="flex center bw bw-right"></i>
         </div>
         <div class="between bg_white middle">
            <i class="flex center yen">&yen;</i>
            <input type="tel" name="price" maxlength='3' autocomplete="off" class="flexitem money" v-model="money" placeholder="请输入提现金额"/>
            <i class="flex center bw bw-del" @click="money=''" v-if="money>0"></i>
            <a href="javascript:;" class="flex center max" @click="max">最大</a>
         </div>
         <div class="between bg_white footer" v-if="balance>=money">
            <div class="flex center left">当前可提现余额为{{balance}}元</div>
            <a href="javascript:;" @click="$router.push({name:'log'})" class="flex center right">查看提现记录<i class="flex center bw bw-right"></i></a>
         </div>
         <div class="between bg_white footer deficiency" v-else>余额可用额度不足</div>
         <div class="flexv center submitbox">
            <p class="hint">当前提现方式最大单次提现200</p>
            <button type="submit" :class="['flex','center','submit',{'deficiency':balance<money || money=='' || money==0 || !/^[1-9]\d{0,2}$/.test(this.money.trim())}]">提交申请</button>
         </div>
         <!--提示框-->
         <toast v-model="toast.show" :type="toast.type">{{toast.text}}</toast>
         <!--选项卡-->
         <div :class="['popup',{show:show}]" @click.self.prevent="cancel">
            <div class="flexv content">
               <p class="flex center bg_white title item">选择提现方式</p>
               <a href="javascript:;" class="flex center bg_white item" v-for="item in options" @click="cancel(item)">{{item.title}}</a>
               <a href="javascript:;" class="flex center bg_white item" @click="$router.push({name:'account'})">管理提现账户</a>
               <a href="javascript:;" class="flex center bg_white cancel item" @click="cancel">取消</a>
            </div>
         </div>
      </form>
      <default :config="config" v-else></default>
   </div>
</template>

<script>
   import {Toast} from 'vux'
   import Default from './module/default'

   export default {
      name: 'withdraw',
      components: {
         Toast, Default
      },
      data(){
         return {
            userInfo: {}, // 用户信息

            money: '',

            is_account: false,  // 账户是否完善
            balance: '0.00',// 账户余额

            show: false,
            title: '微信红包',
            options: [{title: '微信红包', type: 1}, {title: '支付宝', type: 2}],
            type: 1,

            current: false,
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
         // 获取用户信息判断账户类型是否完善
         this.$store.dispatch('user_listing').then(user=>{
            this.userInfo = user;
            this.is_account = user.wechat===null;
         });

         // 获取可用余额
         this.$http.get(`profit/available`).then(res=>{
            this.balance = res.available_profit;

            this.current = true;
            this.config.code = 2;
         });
      },
      methods: {
         // 选项卡
         choice(){
            this.show = true;
            this.$('.popup').style.zIndex = 100;
         },
         // 选项卡关闭
         cancel(val){
            if (val.title) {
               this.title = val.title;
               this.type = val.type;
               if(val.type==1){
                  this.is_account = this.userInfo.wechat===null;
               } else {
                  this.is_account = this.userInfo.is_ali===null;
               }
            }
            this.show = false;
            setTimeout(() => {
               this.$('.popup').style.zIndex = -1;
            }, 400);
         },

         //最大
         max(){
            this.money = 200;
         },
         // 提交
         sendForm(e){
            const ele = e.target.querySelector('input'), name = ele.getAttribute('name'), post = {type: this.type}, sum = Number(ele.value);
            if (e.target.querySelector('button').classList.contains('deficiency')) return;
            if (Number.isInteger(sum)) {
               post[name] = sum;
               this.$http.post(`profit/cash/store`, post).then(res => {
                  if(res.msg == '可用余额不足'){
                     this.toast = {
                        show: true,
                        type: 'warn',
                        text: res.msg
                     }
                  } else {
                     this.toast = {
                        show: true,
                        type: 'success',
                        text: res.msg
                     }
                     this.$router.go(-1);
                  }
               }).catch(() => {
                  this.current = false;
                  this.config = {
                     code: -1,
                     icon: '../../static/image/server_err.png',
                     text: '服务器崩溃啦',
                     routeName: '/',
                     routeText: '刷新一下试试'
                  }
               })
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
