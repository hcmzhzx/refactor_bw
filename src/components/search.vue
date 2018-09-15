<template>
   <div id="search" class="flexv bg_white wrap">
      <div class="flex center search">
         <form class="flexitem wrap input" @submit.prevent="search">
            <i class="flex center bw bw-seek"></i>
            <input type="search" class="flexitem centerv wrap" ref="focus" @input="search" placeholder="搜索感兴趣的内容">
         </form>
         <i class="flex smtxt"></i>
         <a href="javascript:;" class="flex center wrap submit" @click="cancel">取消</a>
      </div>
      <div class="flexv history" v-if="!historydata.length">
         <div class="between">
            <h3 class="title">搜索历史</h3>
            <i class="flex center bw bw-close" @click="close"></i>
         </div>
         <div class="br history-content" v-if="record.length">
            <div class="record" v-for="item in record" @click="keep(item)">{{item}}</div>
         </div>
         <p class="not" v-else>暂无相关搜索记录</p>
      </div>

      <scroller class="flexitemv mainbox tab-container" lock-x use-pullup :pullup-config="pullupConfig" @on-pullup-loading="load" v-model="Value" v-else>
         <div class="flexitemv content box2">
            <div class="flexv item">
               <a href="javascript:;" class="flex bg_white list" v-for="item in historydata" :key="item.id" @click="log(item.id)">
                  <div class="flexv lists" v-if="item.covers">
                     <div class="flexitemv cont">
                        <h2 class="flexitemv">{{item.title}}</h2>
                     </div>
                     <div class="aroundh imgbox">
                        <div class="img" v-for="val in item.covers"><img class="fitimg" :src="val"></div>
                     </div>
                     <div class="flex base">
                        <span class="flex center"><i class="flex center bw bw-check"></i>{{item.view}}</span>
                        <span class="flex center"><i class="flex center bw bw-time"></i>{{item.created_at}}</span>
                     </div>
                  </div>
                  <div class="between lists" v-else>
                     <div class="flexitemv cont">
                        <h2 class="flexitemv">{{item.title}}</h2>
                        <div class="flex base">
                           <span class="flex center"><i class="flex center bw bw-check"></i>{{item.view}}</span>
                           <span class="flex center"><i class="flex center bw bw-time"></i>{{item.created_at}}</span>
                        </div>
                     </div>
                     <div class="img">
                        <img class="fitimg" :src="item.cover">
                     </div>
                  </div>
               </a>
            </div>
         </div>
      </scroller>
   </div>
</template>

<script>
   import {_debounce} from '../assets/js/functions'
   import {Scroller } from 'vux'

   export default {
      name: 'search',
      components: {
         Scroller
      },
      data(){
         return {
            record:[],  //搜索历史
            historydata:[],  // 历史记录数据
            searchTitle:'',  // 搜索内容

            page:1,
            Value:{
               pullupStatus:'default'
            },
            pullupConfig: {
               content: '上拉加载更多',
               downContent: '松开进行加载',
               upContent: '上拉加载更多',
               loadingContent: '加载中...'
            }
         }
      },
      created(){
         // 判断有无搜索历史
         if (localStorage.getItem('record')) {
            this.record = localStorage.getItem('record').split(',');
         }
      },
      mounted(){
         this.$refs.focus.focus();  // 加载后获取焦点
      },
      methods: {
         // 实时搜索
         search: _debounce(function () {
            let val = this.searchTitle = this.$refs.focus.value.trim();
            if (val != '') {
               this.$http.get(`articles?title=${val}`).then(res=>{
                  this.historydata = res.data.data
               })
            }
         },100),

         // 清空搜索历史
         close(){
            localStorage.removeItem('record');
            this.record = [];
         },

         // 历史记录
         keep(txt){
            this.$refs.focus.value = txt;
            this.search();
         },

         // 取消
         cancel(){
            this.$refs.focus.value='';
            this.$router.go(-1);
         },

         // 点击后再记录(id)=文章id
         log(id){
            let recordArr = localStorage.getItem('record') ? localStorage.getItem('record').split(',') : [];
            if (recordArr.length > 0 && this.searchTitle != '') {  // 判断有无搜索历史
               recordArr = recordArr.filter((item) => {
                  return item !== this.searchTitle;
               });
               if(recordArr.length>9){ // 最多10条数据
                  recordArr.pop();
                  recordArr.unshift(this.searchTitle);
               } else {
                  recordArr.unshift(this.searchTitle);
               }
            } else if (this.searchTitle != '') {
               recordArr.unshift(this.searchTitle);
            }
            localStorage.setItem('record', recordArr);
            this.record = localStorage.getItem('record').split(',');

         },

         // 分页
         load(){
            let page = this.page+=1;
            this.$http.get(`articles?title=${this.searchTitle}&page=${page}`).then(res => {
               this.historydata.push(...res.data.data);
               this.Value.pullupStatus = 'default'
            });
         }
      }
   }
</script>
