<template>
  <div id="foodMain">
    <my-header></my-header>
      <div class = "md-layout">
        {{this.$store.getters.currUser}}
        <div class = "md-layout-item">
          <md-steppers :md-active-step.sync="currStep" md-linear md-vertical>
              <md-step id="first" md-label="Activity Level" :md-done.sync="first" :md-error="noWeightErr">
                <activity-level v-on:set-activity="getActivity"></activity-level>
              </md-step>
              <md-step id="second" md-label="Macro Breakdown" :md-done.sync="second">
                <caloric-intake :givenWeight = "givenWeight" :bfPercent = "bfPercent" :activityByDay="activityByDay" :tdeeByDay = "tdeeByDay"></caloric-intake>
              </md-step>
          </md-steppers>
        </div>
      </div>
  </div>
</template>

<script>
import activityLevel from '@/components/activity-level'
import caloricIntake from '@/components/caloric-intake'
import myHeader from '@/components/my-header'
const axios = require('axios')
// /axios.defaults.withCredentials = true

export default {
  name: 'food-main',

  data() {
    return{
      givenWeight: '',
      bfPercent: '',
      activityByDay: '',
      tdeeByDay: '',
      currStep: "first",
      first: false,
      second: false,
      noWeightErr: null,
    }
  },

  methods: {
    getActivity: function(givenActivity){
      this.activityByDay = givenActivity[0];
      this.tdeeByDay = givenActivity[1];
      this.givenWeight = givenActivity[2];
      this.bfPercent = givenActivity[3]

      //check that a weight was entered and move to next tab ('second')
      this.first = true;
      if(!this.givenWeight){
             this.noWeightErr = 'Enter weight to continue'
         }else{
           this.noWeightErr = null
           this.currStep = 'second'
         }
    },

  },

  components: {
    activityLevel,
    caloricIntake,
    myHeader
  }
}

</script>

<style lang="scss">
.md-stepper-header:hover{
  background-color: white;
  transition: none;
  & .md-stepper-text{
    color: #82e9de !important;
  }
}
.md-stepper-header{
  & .md-ripple{
    background-color: white;
  }
}
.md-layout-item{
  width:100vw;
}
.md-steppers{
  padding-left: 5vw;
  padding-right:5vw;
}
#login-button{
  color: white;
}

</style>
