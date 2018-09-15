<template>
   <div id="account" class="flexv wrap">
      <tab active-color="#fe4400" custom-bar-width="4rem" :line-width=3 v-model="indexs" class="nav">
         <tab-item :selected="index==indexs" v-for="(item, index) in headText" @click="indexs=index" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="indexs" class="flexitem" :show-dots="false">
         <swiper-item class="flexv wechat">
            <p class="flex center premise">使用微信红包提现需要满足以下2个条件</p>
            <div class="tab-swiper flexv">
               <div :class="['between','list',{win:accredit}]"><span class="flex">微信授权登录</span><span class="flex">√</span></div>
               <div :class="['between','list',{win:keep}]"><span class="flex">关注公众号</span><span class="flex">√</span></div>
            </div>
            <div class="flexitemv center qrcodebox" v-if="accredit && keep">
               <p class="flex center premise">您当前符合红包体现条件可以使用微信红包提现</p>
            </div>
            <div class="flexitemv centerv qrcodebox" v-else>
               <div class="qrcode"><img src="../../static/image/logo.jpg" class="fitimg"></div>
               <p class="flex center premise">微信红包提现需要关注公众号长按识别二维码关注</p>
            </div>
         </swiper-item>
         <swiper-item class="flexv zhifubao">
            <form class="flexv centerv tab-swiper vux-center" @submit.prevent="sendForm">
               <div class="flexv bg_white content">
                  <label class="flex list">
                     <span class="flex center">支付宝姓名</span>
                     <input type="text" name="ali_name" class="flexitem" placeholder="请填写支付宝姓名" data-rule="*" data-errmsg="请填写姓名" data-sync="true">
                  </label>
                  <label class="flex list">
                     <span class="flex center">支付宝账户</span>
                     <input type="text" name="ali_account" class="flexitem" placeholder="请填写支付宝账户" data-rule="*" data-errmsg="请填写账户" data-sync="true">
                  </label>
               </div>
               <button type="submit" class="flex center submit">保存信息</button>
            </form>
         </swiper-item>
      </swiper>
      <!--提示框-->
      <toast v-model="show" :time="1000" :type="type">{{text}}</toast>
   </div>
</template>

<script>
   import {Tab, TabItem, Toast, Swiper, SwiperItem} from 'vux'
   import {CheckForm} from '../assets/js/checkForm'

   export default {
      name: 'account',
      components: {
         Tab, TabItem, Toast, Swiper, SwiperItem
      },
      data(){
         return{
            indexs:0,
            headText:['微信红包','支付宝'],
            accredit:true,   // 授权
            keep:false,      // 关注

            show: false,
            type: '', //提示类型"success,warn"
            text: '', //提示文字
         }
      },
      methods:{
         sendForm(e){
            new CheckForm(e, err => {
               this.show = true;
               this.text = err;
               this.type = 'warn'
            }, posts => {
               // 更新vuex数据
               this.$store.commit('updata_state',posts);
               this.$http.patch('user',posts).then(res=>{
                  this.show = true;
                  this.text = '提交成功';
                  this.type = 'success'
                  setTimeout(()=>{
                     this.$router.go(-1)
                  },2000)
               })
            })
         }
      }
   }
</script>
