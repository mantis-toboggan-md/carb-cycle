module.exports = {
  ketogenic: (macrosByDay)=>{
    for(let i =  0; i < 7; i++){
      macrosByDay[i].carb = 25;
      macrosByDay[i].fat = parseInt((macrosByDay[i].goalCals - (macrosByDay[i].protein + macrosByDay[i].carb)*4)/9)
    }
    return macrosByDay
  },
  carbMeUp: (macrosByDay)=>{
    for(let i =  0; i < 7; i++){
      macrosByDay[i].fat = 30;
      macrosByDay[i].carb = parseInt((macrosByDay[i].goalCals - (macrosByDay[i].protein*4 + macrosByDay[i].fat*9))/4)
    }
    return macrosByDay
  },

  //Eat at least 700g carbs between saturday and sunday; compensate on weekdays if necessary for target net change
  weekendRefeed: (macrosByDay)=>{
    //sum up daily goal goalCals
    let goalCals = macrosByDay.map((day)=>{
      return day.goalCals
    })
    let weeklyGoal = goalCals.reduce((total, n)=>{
      return total + n
    })
    //set max carbs Saturday and Sunday
    macrosByDay[0].fat = 30;
    macrosByDay[0].carb = parseInt((macrosByDay[0].goalCals - (macrosByDay[0].protein*4 + macrosByDay[0].fat*9))/4)
    macrosByDay[6].fat = 30;
    macrosByDay[6].carb = parseInt((macrosByDay[6].goalCals - (macrosByDay[6].protein*4 + macrosByDay[6].fat*9))/4)

    if(macrosByDay[0].carb < 350){
      //ensure carb intake is at least 700g over weekend
      macrosByDay[0].carb = 350
      macrosByDay[6].carb = 350
      //adjust weekend goal calorie intake to reflect increased carb consumption
      macrosByDay[0].goalCals = (macrosByDay[0].protein + macrosByDay[0].carb) * 4 + macrosByDay[0].fat * 9
      macrosByDay[6].goalCals = (macrosByDay[6].protein + macrosByDay[6].carb) * 4 + macrosByDay[6].fat * 9
      //re-calculate weekday goal cals
      let weekdayGoal = Math.ceil((weeklyGoal -  (macrosByDay[0].goalCals*2))/5)
      for(let i = 1; i < 6; i++){
        //average out the necessary deficit and set daily goals w/ keto params
        macrosByDay[i].goalCals = weekdayGoal
        macrosByDay[i].carb = 25;
        macrosByDay[i].fat = parseInt((macrosByDay[i].goalCals - (macrosByDay[i].protein + macrosByDay[i].carb)*4)/9)
      }
    } else{
      for(let i = 1; i < 6; i++){
        macrosByDay[i].carb = 25;
        macrosByDay[i].fat = parseInt((macrosByDay[i].goalCals - (macrosByDay[i].protein + macrosByDay[i].carb)*4)/9)
      }
    }
    return macrosByDay
  },

  beforeExercise: ()=>{

  }
}
