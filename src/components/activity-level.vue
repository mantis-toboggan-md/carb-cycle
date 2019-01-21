/* eslint-disable */
<template>
  <div id="activity-level" class = "md-elevation-3">
    <div class="md-layout md-gutter md-alignment-left-center" id="weightBF">
      <div class="md-layout-item md-size-10">
      <md-field>
        <label>Weight(lbs)</label>
        <md-input type = "number" v-model = "givenWeight"></md-input>
      </md-field>
    </div>
    <div class="md-layout-item md-size-10">
      <md-field>
        <label>Bodyfat %</label>
        <md-input type = "number" v-model = "bfPercent"></md-input>
         <span class="md-helper-text">Default is 30</span>
      </md-field>
    </div>
    <div class="md-layout-item md-size-20" v-if='this.$store.getters.authStatus == "success"'>
      <md-field>
        <label>plan name</label>
        <md-input type = "text" v-model = "planName"></md-input>
      </md-field>
    </div>
    <div class = 'md-layout-item md-size-10' v-if='this.$store.getters.authStatus == "success"' id='plan-btn'>
      <md-button class="md-flat md-primary" v-on:click="savePlan()">
        Save Plan
      </md-button>
    </div>
    <div class = 'md-layout-item md-size-20' v-if='this.$store.getters.authStatus == "success"'>
      <md-field>
        <md-select v-on:input = 'loadPlan()' v-model='loadedPlan' placeholder = 'load a saved plan'>
          <md-option v-for='plan in this.$store.getters.plans' :key="plan.id" :value = 'plan.plan_name'>{{plan.plan_name}}</md-option>
        </md-select>
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
              <md-input v-model="day.lightCardio" class="activity-input-box" v-on:click="clearInput($event)" autocomplete='off'></md-input>
              <span class="md-helper-text">light cardio</span>
            </md-field>
            <md-field>
              <md-input v-model="day.moderateCardio" class="activity-input-box" v-on:click="clearInput($event)" autocomplete='off'></md-input>
              <span class="md-helper-text">moderate cardio</span>
            </md-field>
            <md-field>
              <md-input v-model="day.intenseCardio" class="activity-input-box" v-on:click="clearInput($event)" autocomplete='off'></md-input>
              <span class="md-helper-text">intense cardio</span>
            </md-field>
            <md-field>
              <md-input v-model="day.str" class="activity-input-box" v-on:click="clearInput($event)" autocomplete='off'></md-input>
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


    data () {
      return{
        givenWeight: this.$store.getters.weight,
        bfPercent: this.$store.getters.bfPer,
        activityByDay: [
          {day: "sunday",
            selectedNEAT: 'Sedentary',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "monday",
            selectedNEAT: 'Sedentary',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "tuesday",
            selectedNEAT: 'Sedentary',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "wednesday",
            selectedNEAT: 'Sedentary',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "thursday",
            selectedNEAT: 'Sedentary',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "friday",
            selectedNEAT: 'Sedentary',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "saturday",
            selectedNEAT: 'Sedentary',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
        ],
        planName: '',
        loadedPlan: '',
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
      clearInput: function(e){
        e.target.value = ''
      },

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
        this.$store.dispatch('saveWeight', {weight: this.givenWeight, bf_per: this.bfPercent})
      },

      savePlan: function(){
        let plan = {
          plan_name: this.planName,
          user_id: this.$store.getters.currUser.id,
          sunday_nonexercise_activity: this.activityByDay[0].selectedNEAT,
          sunday_light_cardio: this.activityByDay[0].lightCardio,
          sunday_moderate_cardio: this.activityByDay[0].moderateCardio,
          sunday_intense_cardio: this.activityByDay[0].intenseCardio,
          sunday_str: this.activityByDay[0].str,
          monday_nonexercise_activity: this.activityByDay[1].selectedNEAT,
          monday_light_cardio: this.activityByDay[1].lightCardio,
          monday_moderate_cardio: this.activityByDay[1].moderateCardio,
          monday_intense_cardio: this.activityByDay[1].intenseCardio,
          monday_str: this.activityByDay[1].str,
          tuesday_nonexercise_activity: this.activityByDay[2].selectedNEAT,
          tuesday_light_cardio: this.activityByDay[2].lightCardio,
          tuesday_moderate_cardio: this.activityByDay[2].moderateCardio,
          tuesday_intense_cardio: this.activityByDay[2].intenseCardio,
          tuesday_str: this.activityByDay[2].str,
          wednesday_nonexercise_activity: this.activityByDay[3].selectedNEAT,
          wednesday_light_cardio: this.activityByDay[3].lightCardio,
          wednesday_moderate_cardio: this.activityByDay[3].moderateCardio,
          wednesday_intense_cardio: this.activityByDay[3].intenseCardio,
          wednesday_str: this.activityByDay[3].str,
          thursday_nonexercise_activity: this.activityByDay[4].selectedNEAT,
          thursday_light_cardio: this.activityByDay[4].lightCardio,
          thursday_moderate_cardio: this.activityByDay[4].moderateCardio,
          thursday_intense_cardio: this.activityByDay[4].intenseCardio,
          thursday_str: this.activityByDay[4].str,
          friday_nonexercise_activity: this.activityByDay[5].selectedNEAT,
          friday_light_cardio: this.activityByDay[5].lightCardio,
          friday_moderate_cardio: this.activityByDay[5].moderateCardio,
          friday_intense_cardio: this.activityByDay[5].intenseCardio,
          friday_str: this.activityByDay[5].str,
          saturday_nonexercise_activity: this.activityByDay[6].selectedNEAT,
          saturday_light_cardio: this.activityByDay[6].lightCardio,
          saturday_moderate_cardio: this.activityByDay[6].moderateCardio,
          saturday_intense_cardio: this.activityByDay[6].intenseCardio,
          saturday_str: this.activityByDay[6].str,
        }
        this.$store.dispatch('savePlan', plan)
        this.$store.dispatch('getPlans')

      },

      loadPlan: function(){
        //display loaded plan on input box of 'save plan'
        this.planName = this.loadedPlan
        let allPlans = this.$store.getters.plans
        let chosenPlan;
        //get plan data from store of all user's plans
        allPlans.map((plan)=>{
          if(plan.plan_name == this.loadedPlan){
            chosenPlan = plan
          }
        })
        this.activityByDay[0].selectedNEAT = chosenPlan.sunday_nonexercise_activity
        this.activityByDay[0].lightCardio = chosenPlan.sunday_light_cardio
        this.activityByDay[0].moderateCardio = chosenPlan.sunday_moderate_cardio
        this.activityByDay[0].intenseCardio = chosenPlan.sunday_intense_cardio
        this.activityByDay[0].str=chosenPlan.sunday_str
        this.activityByDay[1].selectedNEAT = chosenPlan.monday_nonexercise_activity
        this.activityByDay[1].lightCardio = chosenPlan.monday_light_cardio
        this.activityByDay[1].moderateCardio = chosenPlan.monday_moderate_cardio
        this.activityByDay[1].intenseCardio = chosenPlan.monday_intense_cardio
        this.activityByDay[1].str=chosenPlan.monday_str
        this.activityByDay[2].selectedNEAT = chosenPlan.tuesday_nonexercise_activity
        this.activityByDay[2].lightCardio = chosenPlan.tuesday_light_cardio
        this.activityByDay[2].moderateCardio = chosenPlan.tuesday_moderate_cardio
        this.activityByDay[2].intenseCardio = chosenPlan.tuesday_intense_cardio
        this.activityByDay[2].str=chosenPlan.tuesday_str
        this.activityByDay[3].selectedNEAT = chosenPlan.wednesday_nonexercise_activity
        this.activityByDay[3].lightCardio = chosenPlan.wednesday_light_cardio
        this.activityByDay[3].moderateCardio = chosenPlan.wednesday_moderate_cardio
        this.activityByDay[3].intenseCardio = chosenPlan.wednesday_intense_cardio
        this.activityByDay[3].str=chosenPlan.wednesday_str
        this.activityByDay[4].selectedNEAT = chosenPlan.thursday_nonexercise_activity
        this.activityByDay[4].lightCardio = chosenPlan.thursday_light_cardio
        this.activityByDay[4].moderateCardio = chosenPlan.thursday_moderate_cardio
        this.activityByDay[4].intenseCardio = chosenPlan.thursday_intense_cardio
        this.activityByDay[4].str=chosenPlan.thursday_str
        this.activityByDay[5].selectedNEAT = chosenPlan.friday_nonexercise_activity
        this.activityByDay[5].lightCardio = chosenPlan.friday_light_cardio
        this.activityByDay[5].moderateCardio = chosenPlan.friday_moderate_cardio
        this.activityByDay[5].intenseCardio = chosenPlan.friday_intense_cardio
        this.activityByDay[5].str=chosenPlan.friday_str
        this.activityByDay[6].selectedNEAT = chosenPlan.saturday_nonexercise_activity
        this.activityByDay[6].lightCardio = chosenPlan.saturday_light_cardio
        this.activityByDay[6].moderateCardio = chosenPlan.saturday_moderate_cardio
        this.activityByDay[6].intenseCardio = chosenPlan.saturday_intense_cardio
        this.activityByDay[6].str=chosenPlan.saturday_str
      }
    },

    created: function(){
      this.$store.dispatch('getPlans')
      this.$store.dispatch('getCurrWeight')
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
    max-width:100%;
    justify-content: flex-start;
    align-items: center;
}
#plan-btn{
  padding-left: 0px;
  margin-left: -2%;
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
