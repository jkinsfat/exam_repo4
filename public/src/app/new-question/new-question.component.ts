import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from './../api.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  question: {question: string, correct: string, fake1: string, fake2: string}
  error: string
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.question = {question: "", correct: "", fake1: "", fake2: ""}
    this.error = ""
  }

  createQuestion = () => {
    this.apiService.create_question(this.question).then( res => {
      if (res.status) {
        this.router.navigate(['home'])
      } else {
        this.error = res.data
        this.question = {question: "", correct: "", fake1: "", fake2: ""}
      }
    })
  }
}
