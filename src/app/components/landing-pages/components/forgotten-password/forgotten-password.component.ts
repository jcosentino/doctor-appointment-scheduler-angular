import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FORGOT_BUTTON_TEXT,
         LOGIN_TEXT,
         FORGOT_TITLE,
         SEC_QUESTION_DEFAULT,
         SUCCESSFUL_FORGOT_PASSWORD,
         PASSWORD_CRITERIA,
         PROCEED_BUTTON_TEXT,
         BLANK_WARNING,
         USER_NOT_FOUND } from 'src/constants/constants';
import { SecurityQuestionsService } from 'src/app/services/security-questions.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {
  @ViewChild('emailBoxSelect', {static: true}) emailBoxSelect: ElementRef;
  public email: string;
  public password: string;
  public securityAnswer: string;
  public isQuestionActive: Observable<boolean>;
  public securityQuestion = of(SEC_QUESTION_DEFAULT);
  public FORGOT_BUTTON_TEXT = FORGOT_BUTTON_TEXT;
  public LOGIN_TEXT = LOGIN_TEXT;
  public FORGOT_TITLE = FORGOT_TITLE;
  public PASSWORD_CRITERIA = PASSWORD_CRITERIA;
  public PROCEED_BUTTON_TEXT = PROCEED_BUTTON_TEXT;

  constructor(private securityQuesService: SecurityQuestionsService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initialFocus();
  }

  public proceed(): void {
    if (this.validFields()) {
      this.userService.getUserId(this.email).subscribe(
        response => {
          if (response.userid) {
            this.assignSecurityQuestion(response.userid);
            this.isQuestionActive = of(true);
          } else {
            window.alert(USER_NOT_FOUND);
          }
        }
      );
    } else {
      window.alert(BLANK_WARNING);
    }
  }

  public forgotPassword(): void {
    this.securityQuesService.forgotPassword(this.email, this.password, this.securityAnswer)
        .subscribe(response => {
          if (response === SUCCESSFUL_FORGOT_PASSWORD) {
            window.alert(response);
            this.router.navigateByUrl('/home');
          } else {
            window.alert(response);
          }
        });
  }

  private initialFocus(): void {
    if (this.emailBoxSelect) { this.emailBoxSelect.nativeElement.focus(); }
  }

  private validFields(): boolean {
    return this.email &&
           this.password &&
           this.email.length > 0 &&
           this.password.length > 0;
  }

  private assignSecurityQuestion(id: number): void {
    this.userService.getUser(id).subscribe(user => {
      this.securityQuestion = of(this.securityQuesService
                                .getSecurityQuestion(user.sec_ques_num));
    });
  }
}
