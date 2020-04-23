import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FORGOT_BUTTON_TEXT,
         LOGIN_TEXT,
         FORGOT_BLANK_WARNING,
         EMAIL_NEW_PASSWORD,
         FORGOT_INVALID_WARNING,
         FORGOT_TITLE} from 'src/constants/constants';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  @ViewChild('emailBoxSelect', {static: true}) emailBoxSelect: ElementRef;
  public email: string;
  public FORGOT_BUTTON_TEXT = FORGOT_BUTTON_TEXT;
  public LOGIN_TEXT = LOGIN_TEXT;
  public FORGOT_TITLE = FORGOT_TITLE;

  constructor() { }

  ngOnInit() {
    if (this.emailBoxSelect) { this.emailBoxSelect.nativeElement.focus(); }
  }

  public emailValid(email: string): boolean {
    if (!email) { return false; }
    if (email.trim().length === 0) { return false; }
    const splitEmail: string[] = email.split('@');
    if (email && splitEmail.length < 2) { return false; }
    const splitEmailPeriod: string[] = splitEmail[1].split('.');
    if (splitEmailPeriod.length <= 1) { return false; }
    if (splitEmailPeriod[1].length === 0) { return false; }
    return true;
  }

  public forgotPassword(): void {
    const valid: boolean = this.emailValid(this.email);
    // email is defined, invalid, but is an empty space
    if (this.email && !valid && this.email.trim() === '') {
      window.alert(FORGOT_BLANK_WARNING);
    // email is defined, not empty space, but invalid
    } else if (this.email && !valid) {
      window.alert(FORGOT_INVALID_WARNING);
    // email will be sent
    } else if (this.email && valid) {
      window.alert(EMAIL_NEW_PASSWORD);
    // default to blank warning
    } else {
      window.alert(FORGOT_BLANK_WARNING);
    }
    this.email = ''; // reset email field
  }

}
