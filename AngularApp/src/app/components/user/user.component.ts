import { Component, OnInit } from '@angular/core';

import {UserService} from "../shared/user.service";
import {NgForm} from "@angular/forms";
import {User} from "../shared/user.model";

declare var M: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshUsersList();
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }

    this.userService.selectedUser={
      _id:"",
      email:"",
      password:"",
      userName:"",

    }
  }

  onSubmit(form:NgForm){
    if(form.value._id == "" || form.value._id ==null) {
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUsersList();
        M.toast({html: 'Saved Successfully', classes: 'rounded'});
      });
    }
    else{
      M.toast({html: 'Exist', classes: 'rounded'});
      M.toast({html: 'the id is'+form.value._id, classes: 'rounded'});


      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUsersList();
        M.toast({html: 'Updated Successfully', classes: 'rounded'});
      });


    }
  }

  refreshUsersList(){
    this.userService.getUseresList().subscribe((res)=>{
      this.userService.users= res as User[];
    });
  }

  onEdit(user:User){
    this.userService.selectedUser = user;
  }

  onDelete(_id: string, form:NgForm){
    if(confirm('Are you sure to delete this record?')==true){
      this.userService.deleteUser(_id).subscribe((res)=>{
        this.refreshUsersList();
        this.resetForm(form);
        M.toast({html: 'Deleted Successfully', classes: 'rounded'});
      });
    }
  }



}
