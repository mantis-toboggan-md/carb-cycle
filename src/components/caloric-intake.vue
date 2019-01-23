/* eslint-disable */
<template>
  <div id="caloricIntake" class = "md-elevation-3">
    <div class = "md-layout md-gutter" id='carb-style-row'>
      <div class = "md-layout-item" id = "carb-style-select">
        <!-- Select carb consumption style: -->
        <md-field>
          <md-select v-model="carbStyle">
            <md-option value = "Ketogenic">Ketogenic</md-option>
            <md-option value = "Weekend Refeed">Weekend refeeds</md-option>
            <md-option value = 'Carb me the FUCK up'>Carb me the FUCK up</md-option>
            <md-option value = 'Custom day-by-day'>Custom day-by-day</md-option>
          </md-select>
        </md-field>
      </div>
      <div class = 'md-layout-item'>
        <md-field v-if='carbStyle == "Weekend Refeed"' id ='weekly-surplus-input'>
          <md-input v-model = "targetSurplus"></md-input>
          <span class="md-helper-text">surplus (%)</span>
        </md-field>
      </div>
    </div>
      <div class = "md-layout md-gutter">
        <div class = 'md-layout-item activity-cols' id = 'macro-labels'>
          <span id='ratio-label' v-if = 'carbStyle == "Custom day-by-day"'>Carbs : Fat</span>
          <span>TDEE</span>
          <span>Goal Intake</span>
          <span>Protein</span>
          <span>Carbs</span>
          <span>Fat</span>
        </div>

        <div class = 'md-layout-item activity-cols' v-for = "(day, i) in macrosByDay">
          {{day.day}}
          <md-field v-if='carbStyle !="Weekend Refeed"'>
            <md-input v-model = "surplusByDay[i]"></md-input>
            <span class="md-helper-text">surplus (%)</span>
          </md-field>
          <div v-if='carbStyle =="Custom day-by-day"' id ='carb-fat-ratio'>
            <md-field class = 'ratio'>
              <md-input v-model = "ratioByDay[i].carb" v-on:click = "clearInput($event)" type='number'></md-input>
            </md-field>
            :
            <md-field class = 'ratio'>
              <md-input v-model = "ratioByDay[i].fat" v-on:click = "clearInput($event)" type='number'></md-input>
            </md-field>
          </div>
        <div id='macro-column'>
        <div>
          {{tdeeByDay[i]}}
        </div>
        <div>
          {{macrosByDay[i].goalCals}}
        </div>
        <div>
          {{macrosByDay[i].protein}}
        </div>
        <div>
          {{macrosByDay[i].carb}}
        </div>
        <div>
          {{macrosByDay[i].fat}}
        </div>
      </div>
        </div>
      </div>
      <div class = 'md-layout md-gutter' id="net-surplus">
      Weekly caloric surplus: {{weeklySurplus}}
    </div>
    </div>
  </div>
</template>

<script>
const macroCalc = require('../assets/computeMacros.js')
  export default {
    name: 'caloric-intake',

    props: ['givenWeight', 'bfPercent', 'activityByDay', 'tdeeByDay'],

    data() {
      return {
        surplusByDay: [0,0,0,0,0,0,0],
        ratioByDay: [{carb: 1, fat: 1}, {carb: 1, fat: 1}, {carb: 1, fat: 1}, {carb: 1, fat: 1}, {carb: 1, fat: 1}, {carb: 1, fat: 1}, {carb: 1, fat: 1}],
        carbStyle: 'Ketogenic',
        targetSurplus: 0
      }
    },

    methods: {
      clearInput: function(e){
        e.target.value = ''
      },

      getMacros: function(){
        macroCalc.testFunc('something')
      }
    },

    computed:{
      leanBodyMass: function(){
        if(this.bfPercent==''){
          var  bfPercent = 30;
        }
        else{
          var bfPercent = this.bfPercent
        }
        return parseInt(this.givenWeight) - (parseInt(this.givenWeight) * (bfPercent/100));
      },
      macrosByDay: function(){
        //for weekend refeeds, set day-by-day surpluses to avg of week
        if(this.carbStyle == 'Weekend Refeed'){
          for(let i = 0; i < 7; i++){
            this.surplusByDay[i] = (this.targetSurplus)
          }
        }
        let macrosByDay = [
          { day: 'Sunday',
            carb: '',
            fat: '',
            protein: ''
          },
          { day: 'Monday',
            carb: '',
            fat: '',
            protein: ''
          },
          { day: 'Tuesday',
            carb: '',
            fat: '',
            protein: ''
          },
          { day: 'Wednesday',
            carb: '',
            fat: '',
            protein: ''
          },
          { day: 'Thursday',
            carb: '',
            fat: '',
            protein: ''
          },
          { day: 'Friday',
            carb: '',
            fat: '',
            protein: '',
          },
          { day: 'Saturday',
            carb: '',
            fat: '',
            protein: ''
          },
        ]
        for(let i = 0; i < 7; i++){
          const dayTdee = this.tdeeByDay[i];

          //set goal caloric intake
          macrosByDay[i].goalCals = parseInt(dayTdee);

          if(parseInt(this.surplusByDay[i]) != 0){
             macrosByDay[i].goalCals = parseInt(dayTdee) + dayTdee*(this.surplusByDay[i]/100)
          }

          //if in deficit, raise protein reqs
          if(this.surplusByDay[i]<0){
            if(this.bfPercent < 25){
              macrosByDay[i].protein = this.leanBodyMass * 1.3;
            } else if (this.bfPercent >= 25 && this.bfPercent < 30) {
              macrosByDay[i].protein = this.leanBodyMass * 1.1;
            }
            else{
              macrosByDay[i].protein = this.leanBodyMass * 0.9;
            }
            //lower protein in surplus
          } else{
            if(this.bfPercent < 25){
              macrosByDay[i].protein = this.leanBodyMass * 1.1;
            } else if (this.bfPercent >= 25 && this.bfPercent < 30) {
              macrosByDay[i].protein = this.leanBodyMass * 0.9;
            }
            else{
              macrosByDay[i].protein = this.leanBodyMass * 0.8;
            }
          }
          macrosByDay[i].protein = Math.floor(macrosByDay[i].protein)
        }
          //carbs by user-chosen style
          switch (this.carbStyle){
            case 'Ketogenic':
              macrosByDay = macroCalc.ketogenic(macrosByDay)
              break;
            case 'Carb me the FUCK up':
              macrosByDay = macroCalc.carbMeUp(macrosByDay)
              break;
            case 'Weekend Refeed':
              macrosByDay = macroCalc.weekendRefeed(macrosByDay)
              break;
            case 'Custom day-by-day':
              macrosByDay = macroCalc.customRatio(macrosByDay, this.ratioByDay)
          }
        return macrosByDay;
      },
      weeklySurplus: function(){
        let weeklyIntake = 0;
        let weeklyTdee = 0
        for(let i = 0 ; i < 7; i ++){
          weeklyTdee += parseInt(this.tdeeByDay[i])
          weeklyIntake += this.macrosByDay[i].goalCals
        }
        return Math.ceil(weeklyIntake-weeklyTdee)
    }

  }
  }
</script>

<style scoped lang="scss">
.md-elevation-3{
  padding: 5px;
}
#carb-style-row{
  justify-content: flex-start;
  align-items:flex-start;
}
#carb-fat-ratio{
  & input{
    max-width: 10px;
    display: inline;
    padding-top: 2px;
  }
  & .ratio{
    width: 45%;
    display: inline;
  }
}
#ratio-label{
  padding-top: 2px;
}
#weekly-surplus-input{
  max-width: 80px;
}
#carb-style-select{
  max-width: 300px;
}
.md-layout{
  width: 100%;
  margin: 0;
}
#macro-labels{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: white;
  & span{
    padding-top: 2px;
  }
}
#macro-column{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  & div{
    padding-top: 2px;
  }
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}

</style>
