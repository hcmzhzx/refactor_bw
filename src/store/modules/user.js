import axios from '../../assets/js/axios'

const state = { //属性
   userList:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   user_state(state,payload){
      for(let[key,val] of Object.entries(payload)){
         state[key] = val;
      }
   },
   // 更新用户信息
   updata_state(state,payload){
      for(let[key,val] of Object.entries(payload)){
         state.userList[key] = val;
      }
   }
};

const actions = { //应用 mutation 使用(dispath)
   user_listing({commit,state}){
      if(Object.values(state.userList).length) return Promise.resolve(state.userList);
      return axios.get('user').then(res=>{
         commit('user_state',{userList:res});
         return res
      }).catch(err=>err);
   }
};

export default {state, getters, mutations, actions};
