<template>
   <div id="default" class="flexitemv">
      <!--Loading-->
      <loading :show="config.code==0" text="加载中..."></loading>
      <!--数据为空或错误-->
      <div v-if="config.code==-1" class="flexitemv center undata">
         <div class="icon"><img :src="config.icon" class="fitimg"></div>
         <p class="text">{{config.text}}</p>
         <a href="javascript:;" v-if="config.routeName" @click="$router.push({name:`${config.routeName}`})" class="flex center btn">{{config.routeText}}</a>
      </div>
      <!--弹框提示-->
      <div id="alert" v-show="config.code==1" :class="[config.code==1?'show':'']">
         <div class="mask"></div>
         <div class="bg_white content">
            <div class="flex center title">{{config.title}}</div>
            <div class="flex center text">{{config.number}}</div>
            <div class="aroundh btnbox">
               <a href="javascript:;" class="flexitem center btn" @click="cancel">取消</a>
               <a href="javascript:;" class="flexitem center btn" @click="copy(config.number)" :clipboard-text="config.number" style="color:#42bf2c">复制微信</a>
            </div>
         </div>
      </div>
      <!--提示框-->
      <toast v-model="toast.show" width="12rem" type="success">{{toast.text}}</toast>
   </div>
</template>

<script>
   import {Toast, Loading} from 'vux'

   export default {
      name: 'default',
      props:['config'],
      components:{
         Toast, Loading
      },
      data(){
         return{
            toast:{
               show:false,
               text:''
            }
         }
      },
      created(){
         //console.log(this.config);
      },
      methods:{
         // 取消
         cancel(){
            this.config.code = 2
         },

         // 复制
         copy(txt){
            // 有创建记录删除再创建
            if(document.querySelector('.clipboard')){
               document.body.removeChild(document.querySelector('.clipboard'));
            }
            const clipboard = document.createElement('textarea');
            clipboard.value = `${txt}`;
            clipboard.setAttribute("readonly","");
            clipboard.setAttribute("class","clipboard");
            document.body.appendChild(clipboard);
            clipboard.select(); // 选中当前对象
            document.execCommand("Copy"); // 将当前选中区复制到剪贴板。
            this.config.code = 2;
            this.toast={
               show:true,
               text:'复制成功'
            }
         }
      }
   }
</script>
