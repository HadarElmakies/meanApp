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
import {placeService} from "../shared/place.service";
import {Place} from '../shared/place.model';
import {NgbModal, NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

declare var M:any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[placeService]
})


export class HomeComponent implements OnInit {
  //todo places from db
  stateForm: FormGroup;
  listItems: Place[];

  userClaims: any;
  username = '';
  p:Place;
  time="";
  isManager="false";
  lat: number = 51.678418;
  lng: number = 47.809007;
  closeResult: string;



  constructor(private myService:MyserviceService,
              private _router: Router,private placeService:placeService,
              private fb: FormBuilder,private modalService:NgbModal) {
    // this.currentUser = JSON.parse(localStorage.getItem('token'));


    console.log("refresh the list");
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
    this.refreshPlacesList();


    const socket = socketIo('http://localhost:3000');

    socket.on('clock-event',(data)=> {
      console.log(data)
      this.time = data;
    });

  }
  Search(){
    this._router.navigate(['/search']);
  }

  refreshPlacesList(){
    console.log("refresh places");
    this.placeService.getPlacesList().subscribe((res)=>{
      this.placeService.places=res as Place[];
      console.log(res as Place);
      this.p = res as Place;


    });
  }
  Logout() {
    this._router.navigate(['/main/login']);
    localStorage.removeItem('token');


  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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


