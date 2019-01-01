const login_controllers = require("../controllers/login.js")
const profile_controllers = require("../controllers/profiles.js")
module.exports = function(app){

  app.get('/', login_controllers.getIndex);
  app.post('/login', login_controllers.postLogin)
  app.post('/login/new', login_controllers.createAccount)
  app.get('/activity', profile_controllers.getActivity)
}
