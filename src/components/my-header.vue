<template>
  <div class = "md-layout">
    <div class = "md-layout-item">
      <md-toolbar class="md-primary md-dense">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <router-link to= '/' class="md-title" id='header-title'>carb cycle</router-link>
          </div>
          <div class='md-toolbar-section-end'>
           <router-link v-if="this.$store.getters.authStatus !== 'success'" to="/login" id='login-button'><md-button class='md-accent'>Login</md-button></router-link>
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

<style lang="scss" scoped>
  #header-title{
    color: white;
  }
  .md-accent{
    color: white !important;
  }
</style>
