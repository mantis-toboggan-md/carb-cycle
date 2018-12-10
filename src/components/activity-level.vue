/* eslint-disable */
<template>
  <div id="activityLevel">
    <button v-on:click="setActivty()">
      Set Activity Level
    </button>
    <table>
      <tr>
        <th>Activity Type</th>
        <th>Sunday</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
      </tr>
      <tr>
        <td>Non-exercise Activity Level</td>
        <td v-for="day in activityByDay"><select v-model="day.selectedNEAT">
          <option>Lightly Active</option>
          <option>Moderately Active</option>
          <option>Very Active</option>
        </select></td>
      </tr>
      <tr>
        <td>Strength training</td>
        <td v-for="day in activityByDay"><vs-input type ="number" v-model="day.str"/></td>
      </tr>
      <tr>
        <td>Light Cardio</td>
        <td v-for="day in activityByDay"><vs-input v-model="day.lightCardio"/></td>
      </tr>
      <tr>
        <td>Moderate Cardio</td>
        <td v-for="day in activityByDay"><vs-input v-model="day.moderateCardio"/></td>
      </tr>
      <tr>
        <td>Intense Cardio</td>
        <td v-for="day in activityByDay"><vs-input v-model="day.intenseCardio"/></td>
      </tr>
    </table>
    <p>Total time spent:</p>
    <ul>
      <li>Strength training: {{totalStr}} minutes</li>
      <li>Light Cardio: {{totalLightCardio}} minutes</li>
      <li>Moderate Cardio: {{totalModerateCardio}} minutes</li>
      <li>Intense Cardio: {{totalIntenseCardio}} minutes</li>
    </ul>
    <!-- <table>
      <tr>
        <th></th>
        <th>Sunday</th>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
      </tr>
      <tr>
        <td>tdEE</td>
        <td v-for="tdee in tdeeByDay" v-show="tdee !== 'NaN'">{{tdee}}</td>
      </tr>
    </table> -->

    <br>
     <!-- {{ $data }} -->

  </div>
</template>

<script>
import caloricIntake from '@/components/caloric-intake'
  export default {
    name: 'activity-level',

    props: ['givenWeight', 'bfPercent'],

    data () {
      return{
        // givenWeight: '',
        // bfPercent: '',
        activityByDay: [
          {day: "sunday",
            selectedNEAT: 'Lightly Active',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "monday",
            selectedNEAT: 'Lightly Active',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "tuesday",
            selectedNEAT: 'Lightly Active',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "wednesday",
            selectedNEAT: 'Lightly Active',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "thursday",
            selectedNEAT: 'Lightly Active',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "friday",
            selectedNEAT: 'Lightly Active',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
          },
          {day: "saturday",
            selectedNEAT: 'Lightly Active',
            str: 0,
            lightCardio: 0,
            moderateCardio: 0,
            intenseCardio: 0,
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
                neat = rmr * 1.45;
            }
            //use NEAT and provided exercise times to calculate tdEE for each day
            tdeeByDay[i] = (neat + rmr * (0.175 * currDay.lightCardio/60 + 0.25 * currDay.moderateCardio/60 + 0.35 * currDay.intenseCardio/60 + 0.15 * currDay.str/60)).toFixed();
          }
          return tdeeByDay;
      },
    },

    methods: {
      setActivty(){
        this.$emit('set-activity', [this.activityByDay, this.tdeeByDay])
      }
    },

    components: {
      caloricIntake
    },
  }
</script>

<style scoped>
  table{
    color: red;
  }
</style>
