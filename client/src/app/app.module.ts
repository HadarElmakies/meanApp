import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

//import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RegisterComponent} from "./components/register/register.component";
import {AppRoutingModule} from "./app-routing.module";
import {MyserviceService} from "./components/shared/myservice.service";
import {LoginComponent} from "./components/login/login.component";
import { MainDeskComponent } from './components/main-desk/main-desk.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./components/shared/auth.guard";
import {UserService} from "./components/shared/user.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainDeskComponent,
    HomeComponent
    //UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [ MyserviceService, UserService,
                AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import {AppRoutingModule} from "./components/routes";

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { StartComponent } from './components/start/start.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    StartComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //RouterModule.forRoot(appRoutes)
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/
