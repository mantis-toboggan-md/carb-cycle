import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  //save only username when browser leaves page
  reducer: (state) => ({user: state.user}),
  //store state (only username) in localStorage in browser
  storage: window.localStorage
})

Vue.use(Vuex)

const store = ()=> {
  return new Vuex.Store({
    state: {
      status: '',
      token: localStorage.getItem('token') || '',
      user : {}
    },
    mutations: {
      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
      },
      auth_error(state){
        state.status =  'error'
      },
      logout(state){
        state.status = ''
        state.user = ''
      }
    },
    actions: {
      login ({commit}, user){
        return new Promise((resolve, reject)=>{
          commit('auth_request')
          console.log(user)
          axios({url:'http://localhost:8000/login', data:user, method: 'POST'}).then((res)=>{
            const user = res.data.user
            axios.defaults.headers.common['Authorization'] = res.data.token
            commit('auth_success', user)
            resolve(res)
          })
          .catch(err=>{
            commit('auth_error')
            reject(err)
          })
        })
      },
      register ({commit}, user){
        return new Promise((resolve, reject)=>{
          commit('auth_req')
          axios({url:'http://localhost:8000/register', data:user, method: 'POST'}).then((res)=>{
            const user = res.data.user
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', user)
            resolve(res)
          })
          .catch(err=>{
            commit('auth_error')
            reject(err)
          })
        })
      },
      logout ({commit}){
        return new Promise((resolve, reject)=>{
          commit('logout')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
      }

    },
    getters : {
      authStatus: state => state.status
    },

    plugins: [vuexLocal.plugin]
  })
}

export default store
