import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MyserviceService} from "../shared/myservice.service";
import * as socketIo from 'socket.io-client';
import {UserService} from "../shared/user.service";
import {log} from "util";
import {NgbModal, NgbActiveModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {placeService} from "../shared/place.service";
import {Place} from '../shared/place.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[placeService]

})
export class HomeComponent implements OnInit {
  //userClaims: any;
  username = '';
  time="";
  isManager="false";
  //currentUser: User;
  lat: number = 51.678418;
  lng: number = 47.809007;
  closeResult: string;


  constructor(private myService:MyserviceService,
              private _router: Router,
              private  userService: UserService,
              private modalService: NgbModal,
              private placeService:placeService
  ) {
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
    this.refreshPlacesList();
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
        console.error(data);
        if (this.isManager == data) {
          console.log('manager false');
          this._router.navigate(['/home'])
        }
        else {
          console.log('manager true');

          this._router.navigate(['/manager']);
        }


      },
      error => this._router.navigate(['/main/login']))
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

  refreshPlacesList(){
    console.log("refresh places");
    this.placeService.getPlacesList().subscribe((res)=>{
      this.placeService.places=res as Place[];
      console.log(res as Place);

    });
  }


}
