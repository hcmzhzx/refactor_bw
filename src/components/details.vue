<template>
    <div id="details">

    </div>
</template>

<script>
   export default {
      name: 'details',
      data(){
         return{
            time:0,
            times:'',
            Id:'',
            ID:''
         }
      },
      created(){
         this.Id = this.$route.query.id;
         this.$http.get(`user_article/${this.Id}`).then(res=>{
            this.ID = res.footprint.id;
            this.logTime(this.ID);
         })
      },
      methods: {
         logTime(Id){
            if (Id) {
               //1-5随机数
               var v_random = Math.floor(Math.random() * 5 + 1);
               var c_random = Math.floor(Math.random() * 29 + 1);
               //调用函数
               const logReadTime = (time, random)=>{
                  this.$http.post(`user_article/see_time`,{id:Id, time:time+random}).then(res=>{
                     console.log(res);
                  })
               };
               const setTime = (second)=>{
                  var a5 = setInterval(() =>{
                     logReadTime(second, v_random);
                  }, second * 1000);
                  setInterval(()=>{
                     clearInterval(a5);
                  }, second * 1000 + 10);
               };
               const setTime_later = (second)=>{
                  var a6 = setInterval(function () {
                     logReadTime(second, c_random);
                  }, second * 1000);
                  setInterval(function () {
                     clearInterval(a6);
                  }, second * 1000 + 10);
               };
               //-------1分钟前记录--------
               for (var i = 5; i < 61; i++) {
                  setTime(i);
                  i = i + 4;
               }
               //-------1分钟后记录--------
               for (var j = 90; j < 601; j++) {
                  setTime_later(j);
                  j = j + 29;
               }
            }
         }
      }
   }
</script>
