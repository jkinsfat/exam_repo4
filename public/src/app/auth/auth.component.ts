import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from './../api.service';
// import { User } from './../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  user_name: string
  log_error: string

  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
    this.user_name = ""
  }

  // register = () => {
  //   this.log_error = ""
  //   this._marketService.register_user(this.reg_user).then( data => {
  //     if (data.status) {
  //       this._router.navigate(['browse'])
  //     } else {
  //       this.reg_error = data.data
  //       this.reg_user.name = ""
  //       this.reg_user.password = ""
  //     }
  //   })
  // }

  login = () => {
    this._apiService.login_user({user: this.user_name}).then( data => {
      if (data.status) {
        this._router.navigate(['home'])
      } else {
        this.log_error = data.data
        this.user_name = ""
      }
    })
  }
}
