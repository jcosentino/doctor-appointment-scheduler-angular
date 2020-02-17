import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { REGISTER_TEXT,
         LOGIN_BUTTON_TEXT,
         LOGIN_BLANK_WARNING,
         FORGOT_PASSWORD_TEXT } from '../../constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('usernameBoxSelect', {static: true}) usernameBoxSelect: ElementRef;
  private username: string;
  private password: string;
  public REGISTER_TEXT = REGISTER_TEXT;
  public LOGIN_BUTTON_TEXT = LOGIN_BUTTON_TEXT;
  public FORGOT_PASSWORD_TEXT = FORGOT_PASSWORD_TEXT;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usernameBoxSelect.nativeElement.focus();
  }

  public authenticate(): void {
    // this.auth.authenticate(this.username, this.password).subscribe(data => {
    //   window.alert(data);
    //   this.router.navigateByUrl('/');
    // });
    if (this.username && this.password) {
      this.auth.login(this.username);
      this.router.navigateByUrl('/');
    } else {
      window.alert(LOGIN_BLANK_WARNING);
      this.resetFields();
    }
  }

  private resetFields(): void {
    this.username = '';
    this.password = '';
  }
}
