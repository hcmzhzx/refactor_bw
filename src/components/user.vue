<template>
   <!--错误提示组件-->
   <!--<div class="bodys">
      <div class="user" v-if="code == 0">

      </div>
      <div class="network" v-else>
         <network :code="code" :msg="msg"></network>
      </div>
   </div>
   <template>
      <div class="pages">
         <div class="loading" v-if="code == -1"></div>
         <div class="loading" v-if="code == 1"></div>
         <div class="loading" v-if="code == 2">

         </div>
      </div>
   </template>-->


   <div id="user" class="flexv mainbox wrap bg_white">
      <div class="between userInfo">
         <div class="flex centerv left">
            <div class="userImg"><img src="../../static/image/logo.jpg" class="radimg"></div>
            <span class="flexv name">小胡</span>
         </div>
         <div class="between right">
            <a href="javascript:;" class="flex center bw bw-phone"></a>
            <a href="javascript:;" class="flex center bw bw-wx"></a>
         </div>
      </div>
      <div class="flexv analyze">
         <div class="aroundh top">
            <div class="flexv center read">
               <p class="number">20</p>
               <span class="flex text">累计阅读</span>
            </div>
            <div class="flexv center share">
               <p class="number">20</p>
               <span class="flex text">累计阅读</span>
            </div>
         </div>
         <div class="aroundh centre">
            <div class="aroundv left">
               <div class="between list"><span class="flex">朋友圈</span><span class="flex">10次</span></div>
               <div class="between list"><span class="flex">群聊</span><span class="flex">5次</span></div>
               <div class="between list"><span class="flex">单聊</span><span class="flex">20次</span></div>
            </div>
            <i class="flex line"></i>
            <div class="aroundv right">
               <div class="between list"><span class="flex">朋友圈</span><span class="flex">10次</span></div>
               <div class="between list"><span class="flex">好友/群聊</span><span class="flex">5次</span></div>
            </div>
         </div>
         <div class="flexv bottom tab-container">
            <div class="between tit">
               <span class="flex lately">最近阅读</span>
               <a href="javascript:;" class="flex center more">更多阅读记录</a>
            </div>
            <div class="between lists">
               <div class="img">
                  <img class="fitimg" src="../../static/image/logo.jpg">
               </div>
               <div class="flexitemv cont">
                  <h2 class="flexitemv">小胡</h2>
                  <div class="flex base">2012-12-12</div>
               </div>
            </div>
         </div>
      </div>

      <div class="flexv networking">
         <div class="flexv center head">
            <p class="explain">根据事业爆文人脉分析</p>
            <p class="title">您可以通过以下好友或群友找到<span>TA!</span></p>
         </div>

         <div class="analyzeImg">
            <div class="oneself"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img1"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img2"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img3"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img4"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img5"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img6"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img7"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img8"><img src="../../static/image/zxj.jpg" class="radimg"></div>
            <div class="person img9"><img src="../../static/image/zxj.jpg" class="radimg"></div>
         </div>
      </div>


      <!--<div class="flexitemv center undata">
         <div class="icon"><img src="../../static/image/user-icon.png" class="fitimg"></div>
         <p class="text">暂无相关分析数据~</p>
      </div>-->
   </div>
</template>

<script>
   export default {
      name: 'user',
      data () {
         return {

         }
      },
      created () {


         /*.catch(err => {
            this.code = err.code, this.msg = err.msg
         })*/
      }
   }
</script>
