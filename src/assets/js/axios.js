import axios from 'axios'
import {API_URL} from './api'

//初始化axios
axios.defaults.baseURL=`${API_URL}`;

// 添加请求拦截器
axios.interceptors.request.use(config=>{
   //console.log(config);
   config.headers['Authorization'] = localStorage.getItem('access_token');
   return config;
});

// 添加响应拦截器
axios.interceptors.response.use(res=>{
   //console.log(res);
   if(res.headers.authorization){
      if(res.headers.authorization !== localStorage.getItem('access_token')){
         localStorage.setItem('access_token',res.headers.authorization);
      }
   }
   return res.data;
},err=>{
   const errData = err.response;
   //console.log(err,errDate);

   return Promise.reject({ code: errData})
})

export default axios;
