import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-desk',
  templateUrl: './main-desk.component.html',
  styleUrls: ['./main-desk.component.css']
})
export class MainDeskComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
