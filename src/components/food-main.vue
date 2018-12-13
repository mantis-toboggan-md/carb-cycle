<template>
  <div id="foodMain">
    <div class = "md-layout">
      <div class = "md-layout-item">
        <md-toolbar class="md-primary md-large">
          <span class="md-title">carb cycle</span>
        </md-toolbar>
      </div>
    </div>
    <div class = "md-layout">
        <!-- {{$data}} -->
    </div>

      <div class = "md-layout">
        <div class = "md-layout-item">
          <md-steppers :md-active-step.sync="currStep" md-linear md-vertical>
              <md-step id="first" md-label="Activity Level" :md-done.sync="first" :md-error="noWeightErr">
                <activity-level v-on:set-activity="getActivity"></activity-level>
                 <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Continue</md-button>
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
      noWeightErr: null
    }
  },

  methods: {
    getActivity: function(givenActivity){
      this.activityByDay = givenActivity[0];
      this.tdeeByDay = givenActivity[1];
      this.givenWeight = givenActivity[2];
      this.bfPercent = givenActivity[3]
    },
    setDone: function(id, index){
        this[id] = true
        console.log(this.first)
        if(!this.givenWeight){
            this.noWeightErr = 'Enter weight to continue'
        }else{
          this.noWeightErr = null
          if (index) {
            this.currStep = index
          }
        }
      }
  },

  components: {
    activityLevel,
    caloricIntake
  }
}

</script>

<style>
.md-layout-item{
  width:100vw;
}
.md-steppers{
  padding-left: 5vw;
  padding-right:5vw;
}

</style>
