const knex = require("../db/knex.js");
const path = require('path')

module.exports = {
  savePlan: (req,res)=>{
    console.log(req.body)
    knex('activity_plans').insert(req.body).then(()=>{
      res.end('plan saved')
    })
  }
}
