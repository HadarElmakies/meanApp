import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User;
  users:User[];
  readonly baseURL ='http://localhost:3000/users';



  constructor(private http:HttpClient) { }


  register(user:User){
    console.log("register clicked in user service")
    return this.http.post(this.baseURL+'/register',user,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }


  postUser(user:User){
    return this.http.post(this.baseURL,user);
  }

  getUseresList(){
    return this.http.get(this.baseURL);
  }

  putUser(user:User){

    return this.http.put(this.baseURL + `/${user._id}`, user);
  }

  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseURL+'/'+'authenticate',user);

  }


}
