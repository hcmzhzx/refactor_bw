import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import {API_URL} from '@/assets/js/api'

import '@/assets/css/index.css' // 引入css文件

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

router.beforeEach((to, from, next) => {
   /* 路由发生变化修改页面title */
   if (to.meta.title) {
      document.title = to.meta.title
   }

   // 请求token
   if(!localStorage.getItem('access_token')){
      axios.get(`${API_URL}/user/login`).then(res=>{
         localStorage.setItem('access_token',`Bearer ${res.meta.access_token}`)
         next()
      })
   }else {
      next()
   }
})

/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   store,
   components: {App},
   template: '<App/>'
})
