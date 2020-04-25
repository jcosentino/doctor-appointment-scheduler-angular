import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LOGOUT_BUTTON_TEXT } from 'src/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public LOGOUT_BUTTON_TEXT = LOGOUT_BUTTON_TEXT;
  public username: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.persistUsername();
  }

  public logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  private persistUsername(): void {
    this.auth.persistedUsername.subscribe(name => {
      this.username = name;
    });
  }
}
