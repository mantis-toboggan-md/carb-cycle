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
  },

  saveWeight: (req,res)=>{
    let id = jwt.decode(req.headers['authorization']).id
    knex('body_comp').insert({
      user_id: id,
      weight: req.body.weight,
      bf_per: req.body.bfPer
    }).then(()=>{
      res.status(200).end('weight updated')
    })
  },

  currWeight: (req,res)=>{
    let id = jwt.decode(req.headers['authorization']).id
    knex('body_comp').where('user_id', id).orderBy('created_at', desc).then((results)=>{
      res.json({weight: results[0].weight, bf_per: results[0].bf_per})
    })
  }
}
