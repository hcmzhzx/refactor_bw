<template>
   <div id="detail">

      <a href="javascripot:;" @click="cli">成为我的</a>
   </div>
</template>

<script>
   export default {
      name: 'detail',
      data(){
         return{
            time:0,
            times:'',
            Id:'',
         }
      },
      created(){
         document.title  = '小胡测试文章';
         this.Id = this.$route.query.id
         this.$http.get(`article/${this.Id}`).then(res=>{
            console.log(res);
         })
      },
      methods:{
         cli(){
            this.$http.post(`article/become_my`,{article_id:this.Id}).then(res=>{
               console.log(res.user_article.id);
               this.$router.push({name:'details',query:{id:res.user_article.id}})
            })
         }
      }
   }
</script>
