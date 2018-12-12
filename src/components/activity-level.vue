/* eslint-disable */
<template>
  <div id="activity-level">
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
        {{day.day}}
        <div class="activity-by-day-inputs">
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
  <!-- </md-content> -->
    </div>

  </div>






















































<!--
    <button v-on:click="setActivty()">
      Set Activity Level
    </button>
    Enter your weight:
    <input type = "number" v-model = "givenWeight" placeholder = "weight(lbs)">
    Enter your approximate bodyfat %:
    <input type = "number" v-model = "bfPercent" placeholder = "default: 30%">
    <div class="md-layout md-gutter">
    <div class="md-layout-item">
    <md-table>
      <md-table-row>
        <md-table-head>Activity Type</md-table-head>
        <md-table-head>Sunday</md-table-head>
        <md-table-head>Monday</md-table-head>
        <md-table-head>Tuesday</md-table-head>
        <md-table-head>Wednesday</md-table-head>
        <md-table-head>md-table-headursday</md-table-head>
        <md-table-head>Friday</md-table-head>
        <md-table-head>Saturday</md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Non-exercise Activity Level</md-table-cell>
        <md-table-cell v-for="day in activityByDay">
          <md-field>
          <md-select v-model="day.selectedNEAT" name ="day.selectedNEAT" md-dense>
            <md-option value = "Lightly Active">Lightly Active</md-option>
            <md-option value = "Moderately Active">Moderately Active</md-option>
            <md-option value = "Very Active">Very Active</md-option>
          </md-select>
        </md-field>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Strength training</md-table-cell>
        <md-table-cell v-for="day in activityByDay">
          <md-field>
            <md-input type ="number" v-model="day.str"/>
          </md-field>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Light Cardio</md-table-cell>
        <md-table-cell v-for="day in activityByDay">
          <md-field>
            <md-input v-model="day.lightCardio"/>
          </md-field>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Moderate Cardio</md-table-cell>
        <md-table-cell v-for="day in activityByDay">
          <md-field>
            <md-input v-model="day.moderateCardio"/>
          </md-field>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>Intense Cardio</md-table-cell>
        <md-table-cell v-for="day in activityByDay">
          <md-field>
            <md-input v-model="day.intenseCardio"/>
          </md-field>
        </md-table-cell>
      </md-table-row>
    </md-table>

    </div>
    </div>
    <p>Total time spent:</p>
    <ul>
      <li>Strength training: {{totalStr}} minutes</li>
      <li>Light Cardio: {{totalLightCardio}} minutes</li>
      <li>Moderate Cardio: {{totalModerateCardio}} minutes</li>
      <li>Intense Cardio: {{totalIntenseCardio}} minutes</li>
    </ul> -->
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
<!--
    <br> -->
     <!-- {{ $data }} -->

  <!-- </div> -->
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
        this.$emit('set-activity', [this.activityByDay, this.tdeeByDay, this.givenWeight, this.bfPercent])
      }
    },

    components: {
      caloricIntake
    },
  }
</script>

<style scoped>
.md-layout{
  display: flex;
  width:100vw;
  flex-flow:wrap;
  justify-content: center;

}
#weightBF{
    max-width:300px;
}
#activity-input-table{
  margin: auto;
  width:90%;
  display: flex;
  justify-content: space-around;
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
</style>
