<template>
  <div id="foodMain">
  Enter your weight:
  <input type = "number" v-model = "givenWeight" placeholder = "weight(lbs)">
  Enter your approximate bodyfat %:
  <input type = "number" v-model = "bfPercent" placeholder = "default: 30%">
  <!-- {{$data}} -->




  <activity-level :givenWeight = "givenWeight" :bfPercent = "bfPercent" v-on:set-activity="getActivity"></activity-level>
  <caloric-intake :givenWeight = "givenWeight" :bfPercent = "bfPercent" :activityByDay="activityByDay" :tdeeByDay = "tdeeByDay"></caloric-intake>
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
      this.tdeeByDay = givenActivity[1]
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
