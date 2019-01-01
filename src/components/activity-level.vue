/* eslint-disable */
<template>
  <div id="activity-level" class = "md-elevation-3">
    <div class="md-layout md-gutter" id="weightBF">
      <div class="md-layout-item">
      <md-field>
        <label>Weight(lbs)</label>
        <md-input type = "number" v-model = "givenWeight"></md-input>
      </md-field>
    </div>
    <div class="md-layout-item">
      <md-field>
        <label>Bodyfat %</label>
        <md-input type = "number" v-model = "bfPercent"></md-input>
         <span class="md-helper-text">Default is 30</span>
      </md-field>
    </div>
  </div>
  <!-- <md-content> -->
    <div class="md-layout md-gutter" id="activity-input-table">
      <div class="md-layout-item activity-cols" v-for="day in activityByDay">
          <span class = "md-headline">{{day.day}}</span>
          <div class="activity-by-day-inputs">
            <md-field>
              <md-select v-model="day.selectedNEAT" name ="day.selectedNEAT" md-dense>
                <md-option value = "Sedentary">Sedentary</md-option>
                <md-option value = "Lightly Active">Lightly Active</md-option>
                <md-option value = "Moderately Active">Moderately Active</md-option>
                <md-option value = "Very Active">Very Active</md-option>
              </md-select>
              <span class="md-helper-text">non-exercise activity</span>
            </md-field>
            <md-field>
              <md-input v-model="day.lightCardio" class="activity-input-box"></md-input>
              <span class="md-helper-text">light cardio</span>
            </md-field>
            <md-field>
              <md-input v-model="day.moderateCardio" class="activity-input-box"></md-input>
              <span class="md-helper-text">moderate cardio</span>
            </md-field>
            <md-field>
              <md-input v-model="day.intenseCardio" class="activity-input-box"></md-input>
              <span class="md-helper-text">intense cardio</span>
            </md-field>
            <md-field>
              <md-input v-model="day.str" class="activity-input-box"></md-input>
              <span class="md-helper-text">strength</span>
            </md-field>
        </div>
      </div>
    </div>
    <div class="md-layout-item">
      <md-button class="md-raised md-accent" v-on:click="setActivty()">
        Set and Continue
      </md-button>
    </div>
  <!-- </md-content> -->
    </div>
  </div>
</template>

<script>
import caloricIntake from '@/components/caloric-intake'
  export default {
    name: 'activity-level',

    // props: ['givenWeight', 'bfPercent'],

    data () {
      return{
        givenWeight: '',
        bfPercent: '',
        activityByDay: [
          {day: "sunday",
            selectedNEAT: 'Sedentary',
            str: '',
            lightCardio: '',
            moderateCardio: '',
            intenseCardio: '',
          },
          {day: "monday",
            selectedNEAT: 'Sedentary',
            str: '',
            lightCardio: '',
            moderateCardio: '',
            intenseCardio: '',
          },
          {day: "tuesday",
            selectedNEAT: 'Sedentary',
            str: '',
            lightCardio: '',
            moderateCardio: '',
            intenseCardio: '',
          },
          {day: "wednesday",
            selectedNEAT: 'Sedentary',
            str: '',
            lightCardio: '',
            moderateCardio: '',
            intenseCardio: '',
          },
          {day: "thursday",
            selectedNEAT: 'Sedentary',
            str: '',
            lightCardio: '',
            moderateCardio: '',
            intenseCardio: '',
          },
          {day: "friday",
            selectedNEAT: 'Sedentary',
            str: '',
            lightCardio: '',
            moderateCardio: '',
            intenseCardio: '',
          },
          {day: "saturday",
            selectedNEAT: 'Sedentary',
            str: '',
            lightCardio: '',
            moderateCardio: '',
            intenseCardio: '',
          },
        ],
      }
    },

    computed: {
        totalStr: function(){
          let totalStr = 0;
          for(let i = 0; i < 7; i++){
            totalStr += parseInt(this.activityByDay[i].str);
          }
          return totalStr;
        },
        totalLightCardio: function(){
          let totalLightCardio = 0;
          for(let i = 0; i < 7; i++){
            totalLightCardio += parseInt(this.activityByDay[i].lightCardio);
          }
          return totalLightCardio;
        },
        totalModerateCardio: function(){
          let totalModerateCardio = 0;
          for(let i = 0; i < 7; i++){
            totalModerateCardio += parseInt(this.activityByDay[i].moderateCardio);
          }
          return totalModerateCardio;
        },
        totalIntenseCardio: function(){
          let totalIntenseCardio = 0;
          for(let i = 0; i < 7; i++){
            totalIntenseCardio += parseInt(this.activityByDay[i].intenseCardio);
          }
          return totalIntenseCardio;
        },
        leanBodyMass: function(){
          if(this.bfPercent==''){
            var  bfPercent = 30;
          }
          else{
            var bfPercent = this.bfPercent
          }
          return parseInt(this.givenWeight) - (parseInt(this.givenWeight) * (bfPercent/100));
        },
        tdeeByDay: function(){
          let tdeeByDay = [];
          //use LBM to calculate RMR
          let rmr = (12 * this.leanBodyMass) + (2 * (this.givenWeight - this.leanBodyMass));
          //iterate through each day to get day-by-day tdee
          for(let i = 0; i < 7; i ++){
            let currDay = this.activityByDay[i]
            let neat;
            //get NEAT for each day
            switch(currDay.selectedNEAT){
              case "Lightly Active":
                neat = rmr * 1.45;

                break;
              case "Moderately Active":
                neat = rmr * 1.65;
                break;
              case "Very Active":
                neat = rmr * 1.8;
                break;
              default:
                neat = rmr * 1.3;
            }
            //use NEAT and provided exercise times to calculate tdEE for each day
            tdeeByDay[i] = (neat + rmr * (0.175 * currDay.lightCardio/60 + 0.25 * currDay.moderateCardio/60 + 0.35 * currDay.intenseCardio/60 + 0.15 * currDay.str/60)).toFixed();
          }
          return tdeeByDay;
      },
    },

    methods: {
      setActivty: function(){
        for(let i = 0; i < 7; i++){
          if(!this.activityByDay[i].lightCardio){
            this.activityByDay[i].lightCardio = 0;
          }
          if(!this.activityByDay[i].moderateCardio){
            this.activityByDay[i].moderateCardio = 0;
          }
          if(!this.activityByDay[i].intenseCardio){
            this.activityByDay[i].intenseCardio = 0;
          }
          if(!this.activityByDay[i].str){
            this.activityByDay[i].str = 0;
          }
        }
        this.$emit('set-activity', [this.activityByDay, this.tdeeByDay, this.givenWeight, this.bfPercent])
      }
    },

    components: {
      caloricIntake
    },
  }
</script>

<style>
.md-elevation-3{
  padding: 5px;
}
.md-layout{
  display: flex;
  width:100vw;
  flex-flow:wrap;
  justify-content: center;

}
#weightBF{
    max-width:500px;
}
#activity-input-table{
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 0;
}
.activity-cols{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.activity-input-box{
  align-self: center;
  max-width:50px;
}
.activity-cols:nth-child(odd){
  background-color: #e0f2f1;
}
</style>
