import axios from '../../assets/js/axios'

const state = { //属性
   navList:[]
};

const getters = { //获取属性 使用(getters)
   find__(){

   }
};

const mutations = { //改变属性 使用(commit)
   nav_state(state,payload){
      for(let[key,val] of Object.entries(payload)){
         state[key] = val;
      }
   }
};

const actions = { //应用 mutation 使用(dispath)
   nav_listing({commit,state}){
      if(state.navList.length) return Promise.resolve(state.navList);
      return axios.get('categories').then(res=>{
         commit('nav_state',{navList:res.data});
         return res.data
      })
   }
};

export default {state, getters, mutations, actions};
