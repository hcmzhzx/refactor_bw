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
      created(){
         //console.log(this.config);
      }
   }
</script>
