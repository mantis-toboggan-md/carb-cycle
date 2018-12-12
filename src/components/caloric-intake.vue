/* eslint-disable */
<template>
  <div id="caloricIntake">
    Select carb consumption style:
    <select v-model="carbStyle">
      <option>Ketogenic</option>
      <option>Day before exercise</option>
      <option>Weekend refeeds</option>
      <option>Carb me the FUCK up</option>
      <option>Custom day-by-day</option>
    </select>
    <table>
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
        <td>Surplus/Deficit (%)</td>
        <td v-for="(day, i) in macrosByDay"><input type="number" v-model="surplusByDay[i]"></td>
      </tr>
      <tr>
        <td>TDEE</td>
        <td v-for="tdee in tdeeByDay" v-show="tdee !== 'NaN'">{{tdee}}</td>
      </tr>
      <tr>
        <td>
          Goal Intake
        </td>
        <td v-for="(day, i) in macrosByDay">{{macrosByDay[i].goalCals}}</td>
      </tr>
      <tr>
        <td>Protein</td>
        <td v-for="day in macrosByDay">{{day.protein.toFixed()}}</td>
      </tr>
      <tr>
        <td>Carbs</td>
        <td v-for="day in macrosByDay">{{day.carb}}</td>
      </tr>
      <tr>
        <td>Fat</td>
        <td v-for="day in macrosByDay">{{day.fat}}</td>
      </tr>
    </table>
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
          {
            carb: '',
            fat: '',
            protein: ''
          },
          {
            carb: '',
            fat: '',
            protein: ''
          },
          {
            carb: '',
            fat: '',
            protein: ''
          },
          {
            carb: '',
            fat: '',
            protein: ''
          },
          {
            carb: '',
            fat: '',
            protein: ''
          },
          {
            carb: '',
            fat: '',
            protein: '',
          },
          {
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

          //carbs by user-chosen style
          switch (this.carbStyle){
            case 'Ketogenic':
              macrosByDay[i].carb = 25;
              break;
          }

          //fat is remaining cals after carbs and protein calculated
          macrosByDay.map((day)=>{
            day.fat = parseInt((macrosByDay[i].goalCals - (day.protein + day.carb)*4)/9)
          })



        }
        return macrosByDay;
      }
    }


  }
</script>
