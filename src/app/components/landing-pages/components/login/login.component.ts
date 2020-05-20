import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { REGISTER_TEXT,
         LOGIN_BUTTON_TEXT,
         LOGIN_BLANK_WARNING,
         FORGOT_PASSWORD_TEXT,
         LOGIN_TITLE,
         SUCCESSFUL_AUTHENTICATION,
         UNSUCCESSFUL_AUTHENTICATION,
         TOKEN_NAME } from 'src/constants/constants';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('emailBoxSelect', {static: true}) emailBoxSelect: ElementRef;
  public REGISTER_TEXT = REGISTER_TEXT;
  public LOGIN_BUTTON_TEXT = LOGIN_BUTTON_TEXT;
  public FORGOT_PASSWORD_TEXT = FORGOT_PASSWORD_TEXT;
  public LOGIN_TITLE = LOGIN_TITLE;
  private email: string;
  private password: string;

  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initialFocus();
    this.checkLoginStatus();
  }

  public authenticate(): void {
    if (this.email && this.password) {
      this.auth.authenticate(this.email, this.password)
          .subscribe(resp => {
            if (resp === SUCCESSFUL_AUTHENTICATION &&
              this.isEmail(this.email)) {
              this.userService.getUserId(this.email)
                  .subscribe(userid => {
                    this.userService.getUser(userid.userid)
                        .subscribe(user => {
                          this.email = user.email;
                          this.logInAndNavigate();
                        });
                  });
            } else if (resp === SUCCESSFUL_AUTHENTICATION) {
                this.logInAndNavigate();
            } else {
              window.alert(UNSUCCESSFUL_AUTHENTICATION);
              this.resetFields();
            }
          });
    } else {
      window.alert(LOGIN_BLANK_WARNING);
      this.resetFields();
    }
  }

  private resetFields(): void {
    this.email = '';
    this.password = '';
  }

  private initialFocus(): void {
    if (this.emailBoxSelect) {  this.emailBoxSelect.nativeElement.focus(); }
  }

  private isEmail(email: string): boolean {
    return email.split('@').length === 2 ||
           email.replace(/[^a-zA-Z0-9@.]/, '').length === email.length;
  }

  private logInAndNavigate(): void {
    this.auth.login(this.email);
    this.router.navigateByUrl('/home');
  }

  private checkLoginStatus(): void {
    if (this.auth.isUserLoggedIn(TOKEN_NAME)) {
      this.router.navigateByUrl('/home');
    }
  }
}
