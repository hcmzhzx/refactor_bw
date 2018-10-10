<template>
   <form id="userInfo" class="flexv wrap" @submit.prevent="sendForm">
      <div class="flexv bg_white">
         <div class="between list">
            <span class="flex center left">头像</span>
            <div class="flexitem endh right">
               <div class="userImg"><img :src="userInfo.avatar" class="radimg"></div>
               <i class="flex center bw bw-right"></i>
            </div>
            <input type="file" accept="image/*" @change="avatar" ref="avatar">
         </div>
      </div>
      <div class="flexv bg_white">
         <div class="between list">
            <span class="flex center left">姓名</span>
            <input type="text" name="name" v-model="userInfo.name" class="flexitem right name" placeholder="您的姓名" data-rule="*" data-errmsg="请填写姓名" data-sync="true">
         </div>
         <div class="between list">
            <span class="flex center left">昵称</span>
            <input type="text" name="nickname" v-model="userInfo.nickname" class="flexitem right nickname" placeholder="您的昵称" data-rule="*" data-errmsg="请填写昵称" data-sync="true">
         </div>
      </div>
      <div class="flexv bg_white">
         <div class="between list" @click="$router.push({name:'company'})">
            <span class="flex center left">所属公司</span>
            <div class="flexitem endh right company"><span>{{companyText}}</span><i class="flex center bw bw-right"></i></div>
            <input type="hidden" name="company_id" v-model="userInfo.company" data-rule="*" data-errmsg="请选择所属公司" data-sync="true">
         </div>
         <div class="between list">
            <span class="flex center left">微信二维码</span>
            <div class="flexitem endh right qrcode"><span>{{wechat_qrcode}}</span><i class="flex center bw bw-right"></i></div>
            <input type="file" accept="image/*" @change="qrcode" ref="qrcode">
            <input type="hidden" name="wechat_qrcode" v-model="userInfo.wechat_qrcode" data-rule="*" data-errmsg="请上传二维码" data-sync="true">
         </div>
         <div class="between list" @click="$router.push({name:'account'})">
            <span class="flex center left">提现账号</span>
            <div class="flexitem endh right account"><span>{{ali_account}}</span><i class="flex center bw bw-right"></i></div>
            <input type="hidden" name="ali_account" v-model="userInfo.ali_account" data-rule="*" data-errmsg="请选择账号" data-sync="true">
            <input type="hidden" name="ali_name" v-model="userInfo.ali_name">
         </div>
      </div>
      <div class="flexv bg_white">
         <div class="between list">
            <span class="flex center left">手机</span>
            <input type="tel" name="phone" v-model="userInfo.phone" maxlength="11" class="flexitem right phone" placeholder="您的手机号" data-rule="m" data-errmsg="请正确填写手机号" data-sync="true">
         </div>
         <div class="between list">
            <span class="flex center left">微信</span>
            <input type="text" name="wechat" v-model="userInfo.wechat" class="flexitem right wechat" placeholder="您的微信号码" data-rule="*" data-errmsg="请填写微信号" data-sync="true">
         </div>
      </div>
      <button type="submit" class="flex center submit">保存修改</button>
      <!--裁剪图片-->
      <cliper v-show="visible" ref="clipper" @ok="ok" @cancel="cancel" :img="imgUrl" :clipper-img-width="600" :clipper-img-height="600"></cliper>
      <!--提示框-->
      <toast v-model="show" :time="1000" :type="type">{{text}}</toast>
      <!--Loading-->
      <loading :show="load" :text="loadText"></loading>
   </form>
</template>

<script>
   import cliper from './module/cliper'
   import {APP_URL} from '../assets/js/api'
   import {Toast, Loading} from 'vux'
   import {CheckForm} from '../assets/js/checkForm'

   export default {
      name: 'userInfo',
      components: {
         cliper, Toast, Loading
      },
      data(){
         return {
            path:'',   //上传头像
            userInfo: {},  //用户信息
            companyText:'尚未完善', //公司名
            wechat_qrcode:'尚未完善', //微信二维码
            ali_account:'尚未完善',  //账号

            show: false,
            type: '', //提示类型"success,warn"
            text: '', //提示文字

            load: false,
            loadText: '上传中...',

            visible: false,
            imgUrl: ''
         }
      },
      beforeRouteEnter(to, from, next){
         next(vm=>{
            // 获取用户信息
            vm.$store.dispatch('user_listing').then(user => {
               vm.userInfo = {...user};

               if(user.wechat_qrcode) {vm.wechat_qrcode = '已完善'}
               if(user.ali_account) {vm.ali_account = '已完善'}

               // 获取公司信息
               vm.$store.dispatch('company_listing').then(company=>{
                  vm.companyText = company.find((item)=>{
                     return item.id == user.company
                  }).name;
               })
            })
         })
      },
      /*created(){
         // 获取用户信息
         this.$store.dispatch('user_listing').then(user => {
            this.userInfo = {...user};

            if(user.wechat_qrcode) {this.wechat_qrcode = '已完善'}
            if(user.ali_account) {this.ali_account = '已完善'}

            // 获取公司信息
            this.$store.dispatch('company_listing').then(company=>{
               this.companyText = company.find((item)=>{
                  return item.id == user.company
               }).name;
            });
         });
      },*/
      methods: {
         // 用户头像
         avatar(){ //获取到file里图片地址传给子组件
            if(this.$refs.avatar.files[0]){
               this.imgUrl = window.URL.createObjectURL(this.$refs.avatar.files[0]);
               this.visible = true;
               this.$refs.clipper.change() //调用子组件方法
            }
         },
         // 用户二维码
         qrcode(){
            if(this.$refs.qrcode.files[0]){
               const form = new FormData();
               form.append('image',this.$refs.qrcode.files[0]);  // 上传文件
               form.append('type','user_qrcode');
               this.$http.post('user/upload_file',form).then(qrcode=>{
                  this.$store.commit('updata_state',{wechat_qrcode:qrcode.path});
                  this.show = true;
                  this.text = '上传成功';
                  this.type = 'success';
               })
            }
         },
         // 裁剪确认
         ok(data) {
            this.visible = false; //隐藏掉裁剪组件
            this.load = true;  // 显示loading
            const dom = this.$refs.avatar.parentNode;
            if(document.querySelector('input[name=avatar')){ // 防止重复创建
               dom.removeChild(document.querySelector('input[name=avatar'))
            }
            let input = document.createElement('input');
            input.setAttribute('type','hidden');input.setAttribute('name','avatar');
            this.userInfo.avatar = data;
            this.$http.post(`user/upload_base64`,{image:data,type:'user_avatar'}).then(res=>{
               input.value =  res.path;
               this.$store.commit('updata_state',{avatar:`${APP_URL}${res.path}`});
               this.load = false;  // 隐藏loading
               this.show = true;
               this.text = '上传成功';
               this.type = 'success';

               dom.appendChild(input);// 添加
            })
         },
         // 取消裁剪
         cancel(){
            this.visible = false; // 隐藏掉裁剪组件
         },
         // 提交表单验证
         sendForm(e){
            new CheckForm(e, err => {
               this.show = true;
               this.text = err;
               this.type = 'warn'
            }, posts => {
               this.$http.patch('user',posts).then(res=>{
                  this.show = true;
                  this.text = '保存成功';
                  this.type = 'success'
               })
            })
         }
      }
   }
</script>
