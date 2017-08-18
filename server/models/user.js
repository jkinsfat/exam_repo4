const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  name : { type: String, min: 3 },
  games : [{ questions: Number, score: Number }]
})

let GameSchema = new mongoose.Schema({
  name : { type: String, min: 3 },
  questions : Number,
  correct : Number
})

let QuestionSchema = new mongoose.Schema({
  question : { type: String, min: 15 },
  correct : {type: String, min: 1},
  fake1 : {type : String, min: 1},
  fake2 : {type : String, min : 1}
})

mongoose.model('User', UserSchema)
mongoose.model('Question', QuestionSchema)
mongoose.model('Game', GameSchema)
