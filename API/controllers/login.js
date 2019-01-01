const knex = require("../db/knex.js");
const path = require('path')
const bcrypt = require('bcrypt')
const saltRounds = 10;


module.exports = {
  getIndex: function(req, res) {
    res.sendFile('/index.html')
    res.end();
  },

  postLogin: (req,res)=>{
    console.log(req.body.username)
    knex('users').where('username', req.body.username).then((results)=>{
      if(!results[0]) {
        console.log('no user found')
        res.redirect('/')
      } else{
        bcrypt.compare(req.body.password, results[0].password, (err,isValid)=>{
          if(isValid){
            req.session.username = req.body.username
            res.redirect('/')
          } else{
            console.log('invalid password')
            res.redirect('/')
          }
        })
      }
    })
  },

  createAccount: (req,res)=>{
    knex('users').where('username', req.body.new_username).then(results=>{
      if(results[0]){
        console.log('user already exists')
        res.redirect('/')
      } else if (req.body.new_password != req.body.new_password_conf){
        console.log('passwords mismatched')
        res.redirect('/')
      } else{
        bcrypt.hash(req.body.new_password, saltRounds, (err,hash)=>{
          if(err) throw err;
          knex('users').insert({
            username: req.body.new_username,
            email: req.body.new_email,
            password: hash
          }).then(()=>{
            res.redirect('/')
          })
        })
      }
    })
  }
}
