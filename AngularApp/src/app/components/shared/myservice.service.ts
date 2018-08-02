import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class MyserviceService {

  authToken
  constructor(private _http: HttpClient) { }
  /*

      this.http.post(this.baseURL+'/register',user,{
            observe:'body',
            headers:new HttpHeaders().append('Content-Type','application/json')
          });

   */

  submitRegister(body:any){
    return this._http.post('http://localhost:3000/users/register', body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')

    });
  }


  manager(){
    return this._http.get('http://localhost:3000/users/manager',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')

    });
  }


  login(body:any){
    return this._http.post('http://localhost:3000/users/login', body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  /*
    login(email: string, password: string) {
      return this._http.post<any>('http://localhost:3000/users/login', { email: email, password: password })
        .map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', JSON.stringify(user));
          }

          return user;
        });
    }
        */
  getUserName() {
    console.log("the token in my service is "+localStorage.getItem('token'));
    return this._http.get('http://localhost:3000/users/username', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    });
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }

}
