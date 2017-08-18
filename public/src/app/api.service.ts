import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { User } from './user'
import 'rxjs';

@Injectable()
export class ApiService {
  constructor(private _http: Http) { }

  // register_user = user => {
  //   return this._http.post('/register', user).map( data => data.json()).toPromise()
  // }
  getName = () => {
    return this._http.get('/name').map(data => data.json()).toPromise()
  }
  get_last_game = () => {
    return this._http.get('/last').map(data => data.json()).toPromise()
  }
  checkIfLoggedIn = () => {
    return this._http.get('/loggedIn').map(data => data.json()).toPromise()
  }
  login_user = user => {
    return this._http.post('/login', user).map( data => data.json()).toPromise()
  }

  create_question = question => {
    return this._http.post('/newQuestion', question).map( data => data.json()).toPromise()
  }

  get_questions = () => {
    return this._http.get('/quiz').map( data => data.json()).toPromise()
  }
  score_quiz = game => {
    return this._http.post('/score', game).map( data => data.json()).toPromise()
  }
  get_games = () => {
    return this._http.get('/games').map( data => data.json()).toPromise()
  }
  logout = () => {
    return this._http.get('/logout').map(data => data.json()).toPromise()
  }
}
