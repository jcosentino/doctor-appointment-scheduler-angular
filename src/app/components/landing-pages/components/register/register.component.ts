import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { REGISTER_BUTTON_TEXT,
         LOGIN_TEXT,
         REGISTER_TITLE,
         REGISTER_BLANK_WARNING,
         SUCCESSFUL_REGISTRATION,
         SUCCESSFUL_REGISTRATION_MESSAGE} from 'src/constants/constants';
import { AuthService } from 'src/app/services/auth.service';

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
  private username: string;
  private password: string;
  private email: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.registrationSelectBox) { this.registrationSelectBox.nativeElement.focus(); }
  }

  public registerUser(): void {
    if (this.username && this.password && this.email) {
      this.auth.register(this.username, this.password, this.email)
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

}
