const knex = require("../db/knex.js");
const path = require('path')
const jwt = require('jsonwebtoken')

module.exports = {
  savePlan: (req,res)=>{
    knex('activity_plans').insert(req.body).then(()=>{
      res.end('plan saved')
    })
  },

  getPlans: (req,res)=>{
    let id = jwt.decode(req.headers['authorization']).id
    knex('activity_plans').where('user_id', id).then((results)=>{
      res.send({plans:results})
    })
  }
}
