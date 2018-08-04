import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';

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
import {UserComponent} from "./components/user/user.component";
// import social buttons module
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import {FavoritesComponent} from "./components/favorites/favorites.component";

import { LetterBoldPipe } from './components/shared/letter-bold.pipe';
import { SearchFilterPipe } from './components/shared/filter-pipe';
import { ClickOutsideDirective } from './components/shared/dropdown.directive';
import {
  getMatInputUnsupportedTypeError,
  MatRippleModule
} from '@angular/material';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainDeskComponent,
    HomeComponent,
    UserComponent,
    FavoritesComponent,
    ClickOutsideDirective,
    SearchFilterPipe,
    LetterBoldPipe,
    SearchComponent,




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
    JwSocialButtonsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWLqUFP4_jCW0-yqY_kHKf60PukBB7ddc'
    }),




  ],
  providers: [ MyserviceService, UserService,
    AuthGuard],
  bootstrap: [AppComponent],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA
],
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
