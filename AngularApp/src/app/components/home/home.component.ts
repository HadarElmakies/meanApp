import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MyserviceService} from "../shared/myservice.service";
import * as socketIo from 'socket.io-client'
import {UserService} from "../shared/user.service";
import {log} from "util";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  username = '';
  time="";
  isManager="false";
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
    const socket = socketIo('http://localhost:3000');

    socket.on('clock-event',(data)=> {
      console.log(data)
      this.time = data;
    });
  }
  Logout() {
    this._router.navigate(['/main/login']);
    localStorage.removeItem('token');


  }
  Manager(){
   this.myService.manager().subscribe((data)=> {
     console.error(data.toString());
     if (this.isManager == data.toString()) {
       console.log('manager false');
       this._router.navigate(['/home'])
     }
     else {
       console.log('manager true');

       this._router.navigate(['/manager']);
     }


   },
    error => this._router.navigate(['/main/login']))}


}
