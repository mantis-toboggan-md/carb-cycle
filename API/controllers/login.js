const knex = require("../db/knex.js");
const path = require('path')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

module.exports = {
  getIndex: function(req, res) {
    res.sendFile('/index.html')
    res.end();
  },

  postLogin: (req,res)=>{
    knex('users').where('username', req.body.username).then((results)=>{
      if(!results[0]) {
        console.log(res)
        res.send('no user found')
        res.end()
      } else{
        bcrypt.compare(req.body.password, results[0].password, (err,isValid)=>{
          if(isValid){
            let user = results[0]
            let token = jwt.sign({id:user.id}, 'supersecret', {expiresIn: 86400})
            res.send({auth:true, token: token, user:user})
          } else{
            res.send('invalid password')
            res.end()
          }
        })
      }
    })
  },

  createAccount: (req,res)=>{
    knex('users').where('username', req.body.new_username).then(results=>{
      if(results[0]){
        res.send('user already exists')
        res.end()
      } else if (req.body.new_password != req.body.new_password_conf){
        res.status(500).send('passwords mismatched')
        res.end()
      } else{
        bcrypt.hash(req.body.new_password, saltRounds, (err,hash)=>{
          if(err) throw err;
          knex('users').insert({
            username: req.body.new_username,
            email: req.body.new_email,
            password: hash
          }).then(()=>{
            res.end('account created')
          })
        })
      }
    })
  }
}
