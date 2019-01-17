import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = {
  state: {
    plans: []
  },

  mutations: {
    load_plans(state, data){
      state.plans = data
    }
  },
  actions: {
    savePlan({commit}, plan){
      console.log(plan)
      axios({url:'http://localhost:8000/plan', data:plan, method:'POST'}).then((res)=>{
      })
    },

    getPlans({commit}){
      axios({url:'http://localhost:8000/plan', method:'GET'}).then((res)=>{
        commit('load_plans', res.data.plans)
      })
    }
  },

  getters:{
    plans: state=>state.plans
  }
}

export default store
