import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  public authenticate(): void {
    // this.auth.authenticate(this.username, this.password).subscribe(data => {
    //   window.alert(data);
    //   this.router.navigateByUrl('/');
    // });
    this.auth.login();
    this.router.navigateByUrl('/');
  }
}
