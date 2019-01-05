<template>
  <div class = "md-layout">
    <div class = "md-layout-item">
      <md-toolbar class="md-primary md-large">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">carb cycle</span>
          </div>
          <div class='md-toolbar-section-end'>
           <router-link v-if="this.$store.getters.authStatus !== 'success'" to="/login" id='login-button'>Login</router-link>
           <md-button v-if="this.$store.getters.authStatus == 'success'" class="md-accent" v-on:click="logout()">
             Log Out
           </md-button>
         </div>
       </div>
      </md-toolbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',

    methods: {
      logout: function(){
        this.$store.dispatch('logout').then(()=>{
          this.$router.push('/login')
        })
      }
    }
  }
</script>
