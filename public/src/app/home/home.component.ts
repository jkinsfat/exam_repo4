import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games
  last_game
  search

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.search=""
    this.apiService.get_games().then( data => {
      for ( var i = 0; i < data.data.length; i++) {
        data.data[i]["percentage"] = data.data[i].correct / data.data[i].questions
      }
      this.games = data.data.sort( (a,b) => {
        if (a.correct > b.correct) {
          return -1
        }
        if (a.correct < b.correct) {
          return 1
        }
        return 0
      })
    })
    this.apiService.get_last_game().then(data => {
      if (data.data) {
        data.data[0]['percentage'] = data.data[0].correct / data.data[0].questions
        this.last_game = data.data[0]
      }
    })
  }

}
