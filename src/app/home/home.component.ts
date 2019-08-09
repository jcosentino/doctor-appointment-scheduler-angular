import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/assets/constants/app_constants/app_constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public greeting = AppConstants.APP_PAGE_GREETING;

  constructor() { }

  ngOnInit() {
  }

}
