import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from './../api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Array<any>
  user_name
  user_answers
  mixed_answers
  constructor(private apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    this.getQuestions()
    this.apiService.getName().then( data => {
      this.user_name = data.data
    })
    // mixAnswers()
  }
  // mixAnswers() {
  //   for (let question of this.question)
  // }
  cancelQuiz = () => {
    this._router.navigate(['home'])
  }
  submitQuiz = () => {
    let question_count = 0
    let number_correct = 0
    for (let answer in this.user_answers) {
      question_count += 1
      if (this.user_answers[answer] === "") {
        alert("You have not answered all the questions. Don't you like having fun?")
        return
      } else if (this.user_answers[answer] === "correct") {
        number_correct += 1
      }
    }
    this.apiService.score_quiz({questions: question_count, correct: number_correct}).then( response => {
      this._router.navigate(['home'])
    })
  }

  getQuestions = () => {
    this.apiService.get_questions().then( response => {
      this.user_answers = {}
      let questions = [];
      let indexes = [];
      for (let g = 0; g < 3; g++) {
        let new_index = Math.floor(Math.random() * response.data.length)
        if (!indexes.includes(new_index)) {
          indexes.push(new_index)
          questions.push(response.data[new_index])
        } else {
          g -= 1;
        }
      }
      for (let question of questions) {
        this.user_answers[question._id] = "";
      }
      this.questions = questions
    }).catch( error => {
      console.log(error)
    })
  }
}
