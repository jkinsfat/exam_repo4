import { Component } from '@angular/core';
import { Location } from '@angular/common'
import { Router} from '@angular/router'
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  show_nav: boolean
  title = 'app';
  constructor(private router: Router, private location: Location, private apiService: ApiService) {
    router.events.subscribe( val => {
      if (location.path() !== '') {
        this.apiService.checkIfLoggedIn().then( LoggedIn => {
          if (!LoggedIn.status) {
            this.router.navigate([''])
          }
        })
      }
      this.show_nav = !(location.path() === '' || location.path() === 'home/quiz')

    })
  }
  logOut = () => {
    this.apiService.logout().then( data => { this.router.navigate(['']) })

  }
}
