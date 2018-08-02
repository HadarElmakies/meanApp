import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MyserviceService} from "../shared/myservice.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loading = false;
  returnUrl: string;

  constructor(private _myservice: MyserviceService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
// reset login status
    this._myservice.logout();

    // get return url from route parameters or default to '/'
    //this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];
  }

  ngOnInit() {

  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }


  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid ) {
      this._myservice.login(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.toString());
            console.log("navigated");
            //this._router.navigate(['/home']);
            this._router.navigate(['/home']);

          },
          error => {this._router.navigate(['/main/login']); }
        );
    }
  }
  /*
  login() {
    this.loading = true;
    this._myservice.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe(
        data => {
          this._router.navigate([]);
        },
        error => {
          this.loading = false;
        });
  }
*/
  movetoregister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }
}
/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private router : Router) { }

  ngOnInit() {
  }

}
*/
