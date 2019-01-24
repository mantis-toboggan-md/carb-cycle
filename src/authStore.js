import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

const store = {
    state: {
      status: '',
      token: localStorage.getItem('token') || '',
      user : {}
    },
    mutations: {
      auth_request(state){
        state.status = 'loading'
      },
      create_acc(state){
        state.status = 'account created'
      },
      auth_success(state, userData){
        state.status = 'success'
        state.token = userData.token
        state.user = userData.user
      },
      auth_error(state, msg){
        state.status =  msg
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
          axios({url:'http://localhost:8000/login', data:user, method: 'POST'}).then((res)=>{
            if(typeof res.data == 'string'){
              commit('auth_error', res.data)
            } else {
              var userData = {
                user: res.data.user,
                token: res.data.token
              }
              localStorage.setItem('token', userData.token)
              axios.defaults.headers.common['Authorization'] = userData.token
              commit('auth_success', userData)
              resolve(res)
            }
          })
          .catch(err=>{
            commit('auth_error')
            reject(err)
          })
        })
      },
      register ({commit}, user){
        return new Promise((resolve, reject)=>{
            commit('auth_request')
            axios({url:'http://localhost:8000/register', data:user, method: 'POST'}).then((res)=>{
              commit('create_acc')
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
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      currUser: state => state.user
    },

}

export default store
