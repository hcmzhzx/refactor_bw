<template>
   <div id="ucenter" class="flexv wrap">
      <div class="flexitemv mainbox" v-if="Object.keys(userInfo).length">
         <!--头部用户信息-->
         <div class="flexv top bg_white serve">
            <div class="flexv head">
               <div class="between userInfo">
                  <div class="flexv vipTime">
                     <p>会员到期时间</p>
                     <p class="time" v-if="userInfo.member_lock_at">{{userInfo.member_lock_at}}</p>
                     <p class="time" v-else>尚未开通会员</p>
                  </div>
                  <div class="flexv center user">
                     <div class="userImg"><img :src="userInfo.avatar" class="radimg"></div>
                     <p class="flex center name">{{userInfo.name}}</p>
                  </div>
               </div>
               <div class="between member">
                  <span>会员享受全部增值服务</span>
                  <a href="javascritp:;" class="flex center bg_white renew" v-if="userInfo.member_lock_at">立即续费</a>
                  <a href="javascritp:;" class="flex center bg_white renew" v-else>去开通服务</a>
               </div>
            </div>
            <div class="aroundh nav">
               <a href="javascript:;" class="flexv center list">
                  <span>3</span>
                  <p>分类列表</p>
               </a>
               <a href="javascript:;" class="flexv center list">
                  <span>3</span>
                  <p>文章访客</p>
               </a>
               <a href="javascript:;" class="flexv center list">
                  <span>3</span>
                  <p>我的钱包</p>
               </a>
            </div>
         </div>
         <!--增值服务-->
         <div class="flexv bg_white serve">
            <p class="flex center title">增值服务</p>
            <a href="javascript:;" class="between list" @click="$router.push({name:'visitor'})">
               <span class="flex center left"><i class="flex center bw bw-visitor" style="color:#ff4d4c"></i>访客记录</span>
               <span class="flex center right">谁查看了我的文章<i class="flex center bw bw-right"></i></span>
            </a>
            <a href="javascript:;" class="between list">
               <span class="flex center left"><i class="flex center bw bw-share" style="color:#fab928"></i>分享记录</span>
               <span class="flex center right">看看有谁帮我分享了文章<i class="flex center bw bw-right"></i></span>
            </a>
            <a href="javascript:;" class="between list">
               <span class="flex center left"><i class="flex center bw bw-picture" style="color:#28c572"></i>展业美图</span>
               <span class="flex center right">精选展业海报<i class="flex center bw bw-right"></i></span>
            </a>
            <a href="javascript:;" class="between list">
               <span class="flex center left"><i class="flex center bw bw-message" style="color:#ff8700"></i>留言管理</span>
               <span class="flex center right">访客留言管理<i class="flex center bw bw-right"></i></span>
            </a>
         </div>
         <!--基础服务-->
         <div class="flexv bg_white serve">
            <p class="flex center title">基础服务</p>
            <a href="javascript:;" @click="$router.push({name:'userInfo'})" class="between list">
               <span class="flex center left"><i class="flex center bw bw-data" style="color:#5eac2c"></i>修改资料</span>
               <span class="flex center right">完善我的个人信息<i class="flex center bw bw-right"></i></span>
            </a>
            <a href="javascript:;" class="between list">
               <span class="flex center left"><i class="flex center bw bw-article" style="color:#00b8fd"></i>我的文章</span>
               <span class="flex center right">我创建发布的文章<i class="flex center bw bw-right"></i></span>
            </a>
            <a href="javascript:;" class="between list">
               <span class="flex center left"><i class="flex center bw bw-push" style="color:#6975ee"></i>推广中心</span>
               <span class="flex center right">推广用户赚取的佣金<i class="flex center bw bw-right"></i></span>
            </a>
            <a href="javascript:;" class="between list">
               <span class="flex center left"><i class="flex center bw bw-complain" style="color:#f82023"></i>投诉建议</span>
               <span class="flex center right">投诉和意见反馈<i class="flex center bw bw-right"></i></span>
            </a>
         </div>
      </div>
      <!--load 缺省页-->
      <default :config="config"></default>
      <myfooter class="footer"></myfooter>
   </div>
</template>

<script>
   import myfooter from './module/my-footer'
   import Default from './module/default'

   export default {
      name: 'ucenter',
      components:{
         myfooter, Default
      },
      data(){
         return{
            userInfo:{},  // 用户信息

            config: {
               code: 0, // 0 loading, -1 错误信息
               icon: '',
               text: ''
            }
         }
      },
      created(){
         // 获取用户信息
         this.$store.dispatch('user_listing').then(user=>{
            this.userInfo = user;
         }).catch(err=>{
            this.config = {
               code: -1,
               icon: '../../static/image/server_err.png',
               text: '服务器崩溃啦',
               routeName: 'index',
               routeText: '返回首页'
            }
         })
      },
      methods:{

      }
   }
</script>
