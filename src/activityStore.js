import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = {
  state: {
    plans: [],
    weight: '',
    bfPer: ''
  },

  mutations: {
    load_plans(state, data){
      state.plans = data
    },
    save_weight(state,data){
      state.weight = data.weight
      state.bfPer = data.bf_per
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
    },

    saveWeight({commit}, payload){
      axios({url:'http://localhost:8000/weight', method:'POST'}).then(res=>{
        commit('save_weight', payload)
      })
    },

    getCurrWeight({commit}){
      axios({url:'http://localhost:8000/weight', method:'GET'}).then(res=>{
        commit('load_weight', res.data)
      })
    }
  },

  getters:{
    plans: state=>state.plans,
    weight: state=>state.weight,
    bfPer: state=>state.bfPer
  }
}

export default store
