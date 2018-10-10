<template>
    <div id="contact" class="flexv wrap">
       <div class="list" style="display:block">
          <div class="flex left">
             <div class="img"><img src="../../static/image/zxj.jpg" class="fitimg"></div>
             <div class="flex content">放到发噶富商大贾挂号费说过话,放到发噶富商大贾挂号费说过话</div>
          </div>

          <div class="flex endh right">
             <div class="flexv content">
                <button class="flex center">的分公司电</button>
                <button class="flex center">的分公司电</button>
                <button class="flex center">的分公司电</button>
             </div>
             <div class="img"><img src="../../static/image/zxj.jpg" class="fitimg"></div>
          </div>
       </div>
       <div class="fild"></div>
    </div>
</template>

<script>
   export default {
      name: 'contact',


      methods:{
         scrollToTop(){
            let _this = this, timer;
            cancelAnimationFrame(timer)
            timer = requestAnimationFrame(function fn() {
               
            })
         }
      }
   }
</script>

<style>
   #contact .list{display:none;}
   #contact .list,#contact .list>div{margin-bottom:1rem;}
   #contact .img{width:4rem;height:4rem;border-radius:.4rem;overflow:hidden;}
   #contact .content{position:relative;padding:1rem;border-radius:.4rem;border:1px solid;}
   #contact .content:after{content:'';width:.6rem;height:.6rem;transform:rotate(45deg);position:absolute;top:30%;}
   #contact .left{padding:1rem 4rem 0 1rem;}
   #contact .left .content{margin-left:1.6rem;border-color:#D5D5D5;background:#fff;max-width:20rem;}
   #contact .left .content:after{background:#fff;border-left:1px solid #d5d5d5;border-bottom:1px solid #d5d5d5;left:-2%;}
   #contact .right{padding:0 1rem 0 4rem;}
   #contact .right .content{margin-right:1.6rem;border-color:#79B746;background:#C0E278;}
   #contact .right .content:after{background:#C0E278;border-right:1px solid #79B746;border-top:1px solid #79B746;right:-4%;}
   #contact .right .content button{padding:.8rem 1.2rem;border-radius:.4rem;margin-top:1rem;border:1px solid #639838;background:#fff;}
   #contact .right .content button.current{border-color:#fff;color:#ccc;}
   #contact .right .content button:first-child{margin-top:0;}







   #contact .fild{visibility:hidden;}
</style>
