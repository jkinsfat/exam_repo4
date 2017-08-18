const mongoose = require("mongoose");
const Question = mongoose.model("Question");
const Game = mongoose.model("Game");

module.exports = {
  login : (req, res) => {
    if (req.body.user.length >= 3) {
      req.session['user_name'] = req.body.user
      res.json({status: true})
    } else {
      res.json({data: "Name is too short", status: false})
    }
  },
  create_question : (req, res) => {
    console.log(req.body)
    let new_question = new Question({question: req.body.question,
                                    correct: req.body.correct,
                                    fake1: req.body.fake1,
                                    fake2: req.body.fake2
                                  })
    new_question.save()
    .then( registered_question => {
      res.json({data: registered_question, status: true})
    })
    .catch( err => {
      res.json({data: err, status: false})
    })
  },
  get_questions : (req, res) => {
    Question.find({})
    .then( data => {
      res.json({data: data, status: true})
    })
    .catch( err => {
      res.json({data: err, status: true})
    })
  },
  score_quiz : (req, res) => {
    if ("user_name" in req.session) {
      let new_game = new Game({name: req.session['user_name'], correct: req.body.correct, questions: req.body.questions})
      new_game.save().then( registered_game => {
        req.session["last"] = registered_game
        res.json({status: true})
      })
    }
  },
  get_games : (req, res) => {
    Game.find({})
    .then( data => {
      res.json({data: data, status: true})
    })
  },
  logout : (req, res) => {
    req.session.destroy();
    console.log('user has been logged out')
    res.json({data: "logging out"})
  },
  is_logged_in : (req, res) => {
    if ('user_name' in req.session) {
      console.log("someone is logged in")
      res.json({status: true})
    } else {
      console.log("No one is logged in")
      res.json({status: false})
    }
  },
  get_last_game : (req, res) => {
    Game.find({}).limit(1).sort({$natural:-1}).then( data => {

      if (data[0].name == req.session['user_name']) {

        res.json({data: data, status: true})
      } else {

        res.json({data: "", status: false})
      }
    }).catch(error => {
      console.log(error)
    })
  },
  getName : (req, res) => {
    res.json({data: req.session['user_name']})
  }
}
