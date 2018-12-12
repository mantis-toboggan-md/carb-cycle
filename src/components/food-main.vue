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
          <md-tabs>
              <md-tab md-label = "Activity Level">
                <activity-level v-on:set-activity="getActivity"></activity-level>
              </md-tab>
              <md-tab md-label = "Caloric Intake">
                <caloric-intake :givenWeight = "givenWeight" :bfPercent = "bfPercent" :activityByDay="activityByDay" :tdeeByDay = "tdeeByDay"></caloric-intake>
              </md-tab>
          </md-tabs>
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
    }
  },

  methods: {
    getActivity: function(givenActivity){
      this.activityByDay = givenActivity[0];
      this.tdeeByDay = givenActivity[1];
      this.givenWeight = givenActivity[2];
      this.bfPercent = givenActivity[3]
    }
  },

  components: {
    activityLevel,
    caloricIntake
  }
}

</script>

<style>



</style>
