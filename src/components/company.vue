<template>
   <div id="company" class="flexv mainbox wrap">
      <!--头部-->
      <div class="aroundh bg_white head">
         <a href="javascript:;" class="flex centert list current"><span class="flex center">直销行业</span></a>
         <a href="javascript:;" class="flex centert list"><span class="flex center">保险行业</span></a>
         <a href="javascript:;" class="flex centert list"><span class="flex center">其他行业</span></a>
      </div>
      <!--搜索 focus-->
      <div class="flex search">
         <input type="text" class="flexitem bg_white" @input="search" @focus="point=true" :class="[point?'focus':'blur']" ref="find" placeholder="搜索">
         <span class="flex center cancel" @click="point=false" v-if="point">取消</span>
      </div>
      <!--搜索结果展示-->
      <div class="flexv indexlist-wrapper" v-if='point && searchArr.length'>
         <ul class="indexlist-content">
            <li class="indexsection" v-for="item in searchArr" :key="item.id">
               <div class="between list" @click="ok(item.id)">
                  <div class="flexitem left">
                     <div class="logoImg"><img :src="item.logo" class="fitimg"></div>
                     <div class="flexv text">
                        <p class="flexv name">{{item.name}}</p>
                        <span class="flexv deputy">{{item.cname}}</span>
                     </div>
                  </div>
                  <div class="flex center right">
                     <i class="flex center bw bw-right"></i>
                  </div>
               </div>
            </li>
         </ul>
      </div>
      <!--提交审核-->
      <div class="between bg_white present" v-if='!point' @click="slate=true">
         <div class="flex list">
            <i class="flex center bw bw-firm"></i>
            <div class="flexv text">
               <p class="title">提交新公司</p>
               <span class="flex deputy">提交您的公司给我们审核</span>
            </div>
         </div>
         <i class="flex center bw bw-right"></i>
      </div>
      <div class="flexv indexlist-wrapper" v-if='!point'>
         <ul class="indexlist-content">
            <li :id="item" class="indexsection" v-for="(item,index) in PYarr" :key="index">
               <p class="first">{{PYarr[index]}}</p>
               <div class="between list" v-for="val in brands" :key="val.id" @click="ok(val.id)" v-if="val.pinyin.substring(0,1).toUpperCase() == PYarr[index]">
                  <div class="flexitem left">
                     <div class="logoImg"><img :src="val.logo" class="fitimg"></div>
                     <div class="flexv text">
                        <p class="flexv name">{{val.name}}</p>
                        <span class="flexv deputy">{{val.cname}}</span>
                     </div>
                  </div>
                  <div class="flex center right">
                     <span class="flex state" v-if="val.id==userInfo.company">已选</span>
                     <i class="flex center bw bw-right"></i>
                  </div>
               </div>
            </li>
         </ul>
         <div class="flex center wrap indexlist-nav">
            <ul class="flexv navlist">
               <li class="flex center navitem" v-for="item in PYarr"><a :href="`#${item}`">{{item}}</a></li>
            </ul>
         </div>
      </div>
      <!--审核公司页面-->
      <div class="flexv audit-firm" :class="{'slate':slate}">
         <div class="between bg_white head">
            <span class="flex center tit">提交新公司信息</span>
            <i class="flex center bw bw-close" @click="slate=false"></i>
         </div>
         <form class="flexitemv" @submit.prevent="sendForm">
            <label class="flex bg_white">
               <div class="flexitem center logo list">
                  <div class="flexv center">
                     <div class="logoImg" :style="{background:`#eee url(${logoImg}) 0% 0% / cover`}">
                        <!--<img :src="logoImg" class="fitimg">-->
                        <input type="file" accept="image/*" ref="company" data-rule="*" @change="logo" data-errmsg="请选择LOGO图" data-sync="true">
                     </div>
                     <p class="flex center hint">公司LOGO(必选)</p>
                  </div>
               </div>
            </label>
            <label class="flex bg_white">
               <div class="flexitem center list short">
                  <span class="flex center">公司简称</span>
                  <input type="text" class="flexitem" name="short_name" placeholder="公司简称(必填)" data-rule="*" data-errmsg="请填写公司简称" data-sync="true">
               </div>
            </label>
            <label class="flex bg_white">
               <div class="flexitem center list full">
                  <textarea class="flexitem txt-field" name="name" placeholder="公司全称(必填)" data-rule="*" data-errmsg="请填写公司全称" data-sync="true"></textarea>
               </div>
            </label>
            <label class="flex bg_white" style="margin-top:1rem;">
               <div class="flexitem center list remark">
                  <textarea class="flexitem txt-field" name="remark" placeholder="填写备注信息以便更好的审核"></textarea>
               </div>
            </label>
            <button type="submit" class="flex center submit">提交审核</button>
         </form>
      </div>
      <!--提示框-->
      <toast v-model="show" :time="1000" width="12rem" :type="type">{{text}}</toast>
      <!--Loading-->
      <loading :show="load" :text="loadText"></loading>
   </div>
</template>

<script>
   import {_debounce} from '../assets/js/functions'
   import {Toast, Loading} from 'vux'
   import {CheckForm} from '../assets/js/checkForm'

   export default {
      name: 'company',
      components:{
         Toast, Loading
      },
      data(){
         return{
            point:false, // 判断焦点
            slate:false, // 提交审核页面
            PYarr:[],    // 首字母数组
            brands:[],   // 公司数据
            searchArr:[],  // 搜索数组
            userInfo:{}, // 用户信息
            logoImg:'../../static/image/logo-img.jpg', // logo 提示图

            show:false,
            type:'', // 提示类型"success,warn"
            text:'', // 提示文字
            load:false,
            loadText:'',
         }
      },
      created(){
         // 请求公司数据
         this.load = true;
         this.loadText = '加载中...'
         this.$store.dispatch('company_listing').then(res=>{
            this.brands = res;
            this.PYarr = [... new Set(res.map((item)=>{
               return item.pinyin.substring(0,1).toUpperCase();
            }))];
            this.load = false;
         });

         // 获取用户信息
         this.$store.dispatch('user_listing').then(user=>{
            this.userInfo = user;
         });
      },
      methods:{
         // 实时搜索
         search: _debounce(function () {
            let val = this.$refs.find.value.trim();
            if(val){
               this.searchArr = this.brands.filter((item)=>{
                  return item.name.includes(val)
               });
            } else {
               this.searchArr = []
            }
         },500),

         // 确定公司
         ok(id){
            this.$store.commit('updata_state',{company:id});
            this.$http.patch('user',{company_id:id}).then(res=>{
               this.$router.go(-1);
            })
         },

         // logo图
         logo(){
            if(this.$refs.company.files[0]){
               this.logoImg = window.URL.createObjectURL(this.$refs.company.files[0]);
            }
         },
         // 提交公司验证
         sendForm(e){
            new CheckForm(e, err => {
               this.show = true;
               this.text = err;
               this.type = 'warn'
            }, posts => {
               const form = new FormData();
               form.append('logo',this.$refs.company.files[0]);  // 上传文件
               form.append('short_name',posts.short_name);
               form.append('name',posts.name);
               form.append('remark',posts.remark);
               this.$http.post('company',form).then(res=>{
                  console.log(res);
               })
            })
         }
      }
   }
</script>
