import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {MainDeskComponent} from "./components/main-desk/main-desk.component";
import { RegisterComponent } from './components/register/register.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./components/shared/auth.guard";
import {UserComponent} from "./components/user/user.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";
//import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const appRoutingModule: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },

  {
    path: 'main', component: MainDeskComponent, children:
      [
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },

      ]
  },
  { path: 'home', component: HomeComponent ,canActivate:[AuthGuard] },
  {path:'manager',component:UserComponent},
  {path:'favorites',component:FavoritesComponent}

  //{path: 'dash' , component: UserDashboardComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutingModule)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
/*import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {RegisterComponent} from './register/register.component'
import {LoginComponent} from "./login/login.component";
import {StartComponent} from "./start/start.component";
import {FavoritesComponent} from "./favorites/favorites.component";



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

  {path: 'fav', component: FavoritesComponent},

  { path : '', redirectTo:'/login', pathMatch : 'full'}

];
*/
