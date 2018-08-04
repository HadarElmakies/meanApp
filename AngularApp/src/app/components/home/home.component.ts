import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MyserviceService} from "../shared/myservice.service";
import * as socketIo from 'socket.io-client'
import {UserService} from "../shared/user.service";
import {log} from "util";
import { FormBuilder, FormGroup } from '@angular/forms';
import {AppModule} from "../../app.module";
import AngularModule from 'angular-module';
import * as angular from "angular";








@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
  //todo places from db
  stateForm: FormGroup;

  userClaims: any;
  username = '';
  time="";
  isManager="false";


  constructor(private myService:MyserviceService,
              private _router: Router,
              private fb: FormBuilder) {
    // this.currentUser = JSON.parse(localStorage.getItem('token'));



    this.initForm();

    this.myService.getUserName()
      .subscribe(
        data => this.username= data.toString(),
        error => this._router.navigate(['/main/login'])
      )

  }

  initForm(): FormGroup {
    return this.stateForm = this.fb.group({
      search: [null]
    })
  }
  ngOnInit() {
    const socket = socketIo('http://localhost:3000');

    socket.on('clock-event',(data)=> {
      console.log(data)
      this.time = data;
    });
  }
  Search(){
    this._router.navigate(['/search']);
  }
  Logout() {
    this._router.navigate(['/main/login']);
    localStorage.removeItem('token');


  }

  Favorites(){
    this._router.navigate(['/favorites']);
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


