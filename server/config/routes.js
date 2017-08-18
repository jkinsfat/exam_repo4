const dbController = require("../controllers/dbController.js")
const path = require('path');

  module.exports = function(app) {
      app.post('/login', dbController.login)
      app.post('/newQuestion', dbController.create_question)
      app.get('/quiz', dbController.get_questions)
      app.post('/score', dbController.score_quiz)
      app.get('/games', dbController.get_games)
      app.get('/logout', dbController.logout)
      app.get('/loggedIn', dbController.is_logged_in)
      app.get('/last', dbController.get_last_game)
      app.get('/name', dbController.getName)
      // app.post('/register', dbController.create_user)
      // app.get('/products/:id', products.show);
      // app.post('/products', products.create);
      // app.put('/products/:id', products.update);
      // app.delete('/products/:id', products.delete);
      app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./../public/dist/index.html"))
      });
    }
