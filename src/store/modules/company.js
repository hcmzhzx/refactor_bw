import axios from '../../assets/js/axios'

const state = { //属性
   listing:[]
};

const getters = { //获取属性 使用(getters)

};

const mutations = { //改变属性 使用(commit)
   company_state(state,payload){
      state.listing = payload
   }
};

const actions = { //应用 mutation 使用(dispath)
   company_listing({commit,state}){
      if(state.listing.length) return Promise.resolve(state.listing);
      return axios.get('companies').then(res=>{
         commit('company_state',res.data);
         return res.data
      })
   }
};

export default {state, getters, mutations, actions};
