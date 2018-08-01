import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MyserviceService} from "../shared/myservice.service";
import {User} from "../shared/user.model";
import {UserService} from "../shared/user.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  username = '';
  //currentUser: User;
  constructor(private myService:MyserviceService,
              private _router: Router,
              private  userService: UserService) {
    // this.currentUser = JSON.parse(localStorage.getItem('token'));
    this.myService.getUserName()
      .subscribe(
        data => this.username= data.toString(),
        error => this._router.navigate(['/main/login'])
      )

  }
  ngOnInit() {
  }
  Logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/main/login']);

  }

}
