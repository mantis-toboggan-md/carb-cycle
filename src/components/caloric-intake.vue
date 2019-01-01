/* eslint-disable */
<template>
  <div id="caloricIntake" class = "md-elevation-3">
    <div class = "md-layout md-gutter">
      <div class = "md-layout-item">
        Select carb consumption style:
        <md-field id = "carb-style-select">
          <md-select v-model="carbStyle">
            <md-option value = "Ketogenic">Ketogenic</md-option>
            <md-option value = "Day Before Exercise">Day before exercise</md-option>
            <md-option value = "Weekend Refeed">Weekend refeeds</md-option>
            <md-option value = 'Carb me the FUCK up'>Carb me the FUCK up</md-option>
            <md-option value = 'Custom day-by-day'>Custom day-by-day</md-option>
          </md-select>
        </md-field>
      </div>
    </div>
      <div class = "md-layout md-gutter">
        <div class = 'md-layout-item activity-cols' id = 'macro-labels'>
          <span>TDEE</span>
          <span>Goal Intake</span>
          <span>Protein</span>
          <span>Carbs</span>
          <span>Fat</span>
        </div>
        <div class = 'md-layout-item activity-cols' v-for = "(day, i) in macrosByDay">
          {{day.day}}
          <md-field>
          <md-input v-model = "surplusByDay[i]"></md-input>
          <span class="md-helper-text">surplus (%)</span>
        </md-field>
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
      <div class = 'md-layout md-gutter' id="net-surplus">
      Net caloric surplus: {{weeklySurplus}}
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'caloric-intake',

    props: ['givenWeight', 'bfPercent', 'activityByDay', 'tdeeByDay'],

    data() {
      return {
        surplusByDay: [0,0,0,0,0,0,0],
        carbStyle: 'Ketogenic'
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

          //carbs by user-chosen style
          switch (this.carbStyle){
            case 'Ketogenic':
              macrosByDay[i].carb = 25;
              macrosByDay[i].fat = parseInt((macrosByDay[i].goalCals - (macrosByDay[i].protein + macrosByDay[i].carb)*4)/9)
              break;
            case 'Carb me the FUCK up':
              macrosByDay[i].fat = 30;
              macrosByDay[i].carb = parseInt((macrosByDay[i].goalCals - (macrosByDay[i].protein*4 + macrosByDay[i].fat*9))/4)
          }




        }
        return macrosByDay;
      },
      weeklySurplus: function(){
        let sum = 0;
        for(let i = 0; i < 7; i++){
          sum += (this.tdeeByDay[i]*this.surplusByDay[i]/100)
        }
        return sum;
    }

  }
  }
</script>

<style scoped>
.md-elevation-3{
  padding: 5px;
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
}

</style>
