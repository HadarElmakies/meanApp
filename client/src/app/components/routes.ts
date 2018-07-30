import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {RegisterComponent} from "./user/register/register.component";
import {LoginComponent} from "./user/login/login.component";



export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  { path : '', redirectTo:'/login', pathMatch : 'full'}

];
