import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import activityLevel from '@/components/activity-level'
import caloricIntake from '@/components/caloric-intake'
import foodMain from '@/components/food-main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'foodMain',
      component: foodMain
    },
  ]
})
