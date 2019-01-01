const knex = require("../db/knex.js");
const path = require('path')

module.exports = {
  getActivity: function(req,res){
    console.log(req.session.username)
    knex('users').where('username', req.session.username).then((results)=>{
      console.log(req.session.username)
      let profile = results[0]
      res.json(profile)
    })
  }
}
