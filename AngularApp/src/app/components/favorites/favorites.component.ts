import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MyserviceService} from "../shared/myservice.service";
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  isManager="false";
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private myService:MyserviceService,private _router: Router) { }

  ngOnInit() {
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
