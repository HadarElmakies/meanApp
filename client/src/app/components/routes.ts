import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from "./login/login.component";
import {StartComponent} from "./start/start.component";



export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'signup', component: StartComponent,
    children: [{ path: '', component: RegisterComponent }]
  },
  {
    path: 'login', component: StartComponent,
    children: [{ path: '', component: LoginComponent }]
  },
  { path : '', redirectTo:'/login', pathMatch : 'full'},

  {path: 'manager', component: UserComponent},
  { path : '', redirectTo:'/login', pathMatch : 'full'}

];
