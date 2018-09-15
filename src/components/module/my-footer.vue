<template>
   <div id="myFooter" class="aroundh bg_white">
      <a href="javascript:;" @click="$router.push({name:'index'})" :class="['flexv','center','tab',{current:$route.name=='index'}]">
         <i class="flex center bw bw-find"></i>
         <span>发现</span>
      </a>
      <a href="javascript:;" @click="$router.push({name:'ucenter'})" :class="['flexv','center','tab',{current:$route.name=='ucenter'}]">
         <i class="flex center bw bw-home"></i>
         <span>我的</span>
      </a>
   </div>
</template>

<script>
   export default {
      name: 'myFooter',

   }
</script>
