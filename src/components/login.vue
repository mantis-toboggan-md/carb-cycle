<template>
  <div id='login'>
    <div class = "md-layout">
      <div class = "md-layout-item">
        <md-toolbar class="md-primary md-large">
          <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
              <span class="md-title">carb cycle</span>
            </div>
          </div>
        </md-toolbar>
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
              <md-input v-model="password"></md-input>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button v-on:click="sendLogin()">Log in</md-button>
          </md-card-actions>
        </md-card>
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
              <md-input v-model="new_email"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="new_password"></md-input>
            </md-field>
            <md-field>
              <label>Confirm Password</label>
              <md-input v-model="new_password_conf"></md-input>
            </md-field>
          </md-card-content>
          <md-card-actions>
            <md-button v-on:click='createAccount()'>Create Account</md-button>
          </md-card-actions>
        </md-card>
      </div>
      {{this.username}}
    </div>
  </div>
</template>

<script>
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
             .then(() => this.$router.push('/'))
      },

      createAccount: function(){
        axios.post('http://localhost:8000/login/new', {
          new_username: this.new_username,
          new_email: this.new_email,
          new_password: this.new_password,
          new_password_conf: this.new_password_conf
        })
      }
    }
  }

</script>
