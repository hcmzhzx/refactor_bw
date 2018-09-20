<template>
   <div id="user" class="flexv wrap">
      <div class="flexv mainbox bg_white" v-if="Object.keys(analyze).length">
         <div class="between userInfo">
            <div class="flex centerv left">
               <div class="userImg"><img :src="userInfo.avatar" class="radimg"></div>
               <span class="flexv name">{{userInfo.name}}</span>
            </div>
            <div class="between right">
               <a :href="`tel:${analyze.user.phone}`" class="flex center bw bw-phone" v-if="analyze.user.profession"></a>
               <a href="javascript:;" class="flex center bw bw-phone" @click="phone" v-else></a>
               <a href="javascript:;" class="flex center bw bw-wx" @click="wechat(analyze.user.wechat)"></a>
            </div>
         </div>
         <div class="flexv analyze">
            <div class="aroundh top">
               <div class="flexv center read">
                  <p class="number">{{analyze.read_total}}</p>
                  <span class="flex text">累计阅读</span>
               </div>
               <div class="flexv center share">
                  <p class="number">{{analyze.share_total}}</p>
                  <span class="flex text">累计分享</span>
               </div>
            </div>
            <div class="aroundh centre">
               <div class="aroundv left">
                  <div class="between list"><span class="flex">朋友圈</span><span class="flex">{{analyze.read_line}}次</span></div>
                  <div class="between list"><span class="flex">群聊</span><span class="flex">{{analyze.read_group}}次</span></div>
                  <div class="between list"><span class="flex">单聊</span><span class="flex">{{analyze.read_single}}次</span></div>
               </div>
               <i class="flex line"></i>
               <div class="aroundv right">
                  <div class="between list"><span class="flex">朋友圈</span><span class="flex">{{analyze.share_line}}次</span></div>
                  <div class="between list"><span class="flex">好友/群聊</span><span class="flex">{{analyze.share_single}}次</span></div>
               </div>
            </div>
            <div class="flexv bottom tab-container">
               <div class="between tit">
                  <span class="flex lately">最近阅读</span>
                  <a href="javascript:;" class="flex center more">更多阅读记录</a>
               </div>
               <div class="between lists">
                  <div class="img">
                     <img class="fitimg" :src="analyze.last_article[0].cover">
                  </div>
                  <div class="flexitemv cont">
                     <h2 class="flexitemv">{{analyze.last_article[0].title}}</h2>
                     <div class="flex base">{{analyze.last_article[0].created_at}}</div>
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
      </div>
      <!--load 缺省页-->
      <default :config="config"></default>
      <!--提示框-->
      <toast v-model="toast.show" width="12rem" :type="toast.type">{{toast.text}}</toast>
   </div>
</template>

<script>
   import Default from './module/default'
   import {Toast} from 'vux'

   export default {
      name: 'user',
      components: {
         Default,Toast
      },
      data () {
         return {
            user:{},
            analyze: {},
            Id: '1', // 访客用户ID

            config: {
               code: 0, // 0 loading, -1 错误信息
               icon: '',
               text: '',
               title:'',
               number:''
            },
            toast:{
               show:false,
               type:'', // 提示类型"success,cancel,warn"
               text:''
            }
         }
      },
      created () {
         //this.Id = this.$route.query.id;

         // 获取用户信息
         this.$store.dispatch('user_listing').then(user=>{
            this.userInfo = user;

            // 获取分析数据
            this.$http.get(`visitor/user_analysis/${this.Id}`).then(analysis => {
               if(analysis.last_article.length>0){
                  this.config.code = 2;
                  this.analyze = analysis
               } else {
                  this.config = {
                     code: -1,
                     icon: '../../static/image/default-icon.png',
                     text: '暂无相关分析数据~'
                  }
               }
            }).catch(err=>{
               this.config = {
                  code: -1,
                  icon: '../../static/image/server_err.png',
                  text: '服务器崩溃啦',
                  routeName: 'index',
                  routeText: '返回首页'
               }
            })
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
         // 电话
         phone(){
            this.toast={
               show:true,
               type:'cancel',
               text:'该用户尚未上传'
            }
         },
         // 微信
         wechat(num){
            if(num){
               this.config={
                  code:1,
                  title:'微信号',
                  number:num
               }
            } else {
               this.toast={
                  show:true,
                  type:'cancel',
                  text:'该用户尚未上传'
               }
            }
         }
      }
   }
</script>
