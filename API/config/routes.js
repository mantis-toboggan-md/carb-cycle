const login_controllers = require("../controllers/login.js")
const profile_controllers = require("../controllers/profiles.js")
module.exports = function(app){

  app.get('/', login_controllers.getIndex);
  //log user in, send user data to store
  app.post('/login', login_controllers.postLogin)
  //register acct in db
  app.post('/register', login_controllers.createAccount)
  //save an activity plan w/ user id
  app.post('/plan', profile_controllers.savePlan)
  //load user's activity plans when activity component is loaded
  app.get('/plan', profile_controllers.getPlans)
}
