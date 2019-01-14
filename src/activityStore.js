import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = {
  state: {

  },
  actions: {
    savePlan({commit}, plan){
      console.log(plan)
      axios({url:'http://localhost:8000/plan', data:plan, method:'POST'}).then((res)=>{
      })
    }
  }

}

export default store
