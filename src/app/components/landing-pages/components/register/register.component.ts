import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { REGISTER_BUTTON_TEXT,
         LOGIN_TEXT,
         REGISTER_TITLE,
         REGISTER_BLANK_WARNING,
         SUCCESSFUL_REGISTRATION,
         SUCCESSFUL_REGISTRATION_MESSAGE,
         SECURITY_ANSWER_PROMPT,
         SECURITY_ANSWER_CRITERIA,
         EMAIL_CRITERIA,
         PASSWORD_CRITERIA} from 'src/constants/constants';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityQuestionsService } from 'src/app/services/security-questions.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('registrationSelectBox', {static: true}) registrationSelectBox: ElementRef;
  public REGISTER_BUTTON_TEXT = REGISTER_BUTTON_TEXT;
  public LOGIN_TEXT = LOGIN_TEXT;
  public REGISTER_TITLE = REGISTER_TITLE;
  public SECURITY_ANSWER_PROMPT = SECURITY_ANSWER_PROMPT;
  public EMAIL_CRITERIA = EMAIL_CRITERIA;
  public PASSWORD_CRITERIA = PASSWORD_CRITERIA;
  public SECURITY_ANSWER_CRITERIA = SECURITY_ANSWER_CRITERIA;
  private email: string;
  private password: string;
  private securityQuesNum: number;
  private securityQuestion: string;
  private securityAnswer: string;

  constructor(private auth: AuthService,
              private secQuesService: SecurityQuestionsService,
              private router: Router) { }

  ngOnInit() {
    this.initialFocus();
    this.initializeSecurityQuestion();
  }

  public registerUser(): void {
    if (this.allFieldsFilled(this.email, this.password, this.securityAnswer)) {
      this.auth.register(this.email,
                         this.password,
                         this.securityQuesNum,
                         this.securityAnswer)
          .subscribe(resp => {
            if (resp === SUCCESSFUL_REGISTRATION) {
              window.alert(SUCCESSFUL_REGISTRATION_MESSAGE);
              this.router.navigateByUrl('login');
            } else {
              window.alert(resp);
            }
          });
  } else {
      window.alert(REGISTER_BLANK_WARNING);
    }
  }

  private initialFocus(): void {
    if (this.registrationSelectBox) { this.registrationSelectBox.nativeElement.focus(); }
  }

  private initializeSecurityQuestion(): void {
    this.securityQuesNum = this.secQuesService.generateSecurityQuesId();
    this.securityQuestion = this.secQuesService.getSecurityQuestion(this.securityQuesNum);
  }

  private allFieldsFilled(email: string,
                          password: string,
                          securityAnswer: string) {
    return email && password && securityAnswer;
  }
}
