<template>
  <div id='login'>
    <my-header></my-header>
    <div class = "md-layout">
      {{this.$store.getters.authStatus}}
    </div>
    <div class = 'md-layout'>
      <div class='md-layout-item md-alignment-center'>
        <md-card>
          <md-card-header>
            <div class='md-title'>
              Login
            </div>
          </md-card-header>
          <md-card-content>
            <md-field>
              <label>Username</label>
              <md-input v-model="username"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input type = 'password' v-model="password"></md-input>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button v-on:click="sendLogin()">Log in</md-button>
          </md-card-actions>
        </md-card>
      </div>
      </div>
      <div class='md-layout'>
        <div class='md-layout-item'>
          <md-card>
            <md-card-header>
              <div class='md-title'>
                Create Account
              </div>
            </md-card-header>
            <md-card-content>
              <md-field>
                <label>Username</label>
                <md-input v-model="new_username"></md-input>
              </md-field>
              <md-field>
                <label>E-mail</label>
                <md-input type = 'email' v-model="new_email"></md-input>
              </md-field>
              <md-field>
                <label>Password</label>
                <md-input type = 'password' v-model="new_password"></md-input>
              </md-field>
              <md-field>
                <label>Confirm Password</label>
                <md-input type = 'password' v-model="new_password_conf"></md-input>
              </md-field>
            </md-card-content>
            <md-card-actions>
              <md-button v-on:click='createAccount()'>Create Account</md-button>
            </md-card-actions>
          </md-card>
        </div>
      </div>
      {{this.username}}
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/my-header'
let axios = require('axios')
  export default {
    name: 'login',

    data () {
      return{
        username: '',
        password: '',
        new_email: '',
        new_username: '',
        new_password: '',
        new_password_conf: '',
        new_email: ''
      }
    },

    methods: {
      sendLogin: function(){
          let username = this.username
          let password = this.password
          this.$store.dispatch('login', { username, password })
             .then(()=>{
               console.log(this.$store.getters.authStatus)
               if(this.$store.getters.authStatus == 'success'){
                 this.$router.push('/')
               }
             })
      },

      createAccount: function(){
        let user = {
          new_username: this.new_username,
          new_email: this.new_email,
          new_password: this.new_password,
          new_password_conf: this.new_password_conf
        }
        this.$store.dispatch('register', user)
          .then(() => {
            this.new_email = ''
            this.new_password = ''
            this.new_password_conf = ''
            this.new_username = ''
            this.$router.push('/login')
          })
      },

      logOut: function(){
        this.$store.dispatch('logout')
      }
    },

    components: {
      myHeader
    }
  }

</script>

<style scoped>
  .md-card{
    max-width: 90vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5vh;
  }
</style>
