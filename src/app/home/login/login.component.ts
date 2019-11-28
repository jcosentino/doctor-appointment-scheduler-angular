import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  public authenticate(): void {
    this.auth.authenticate(this.username, this.password).subscribe(data => {
      window.alert(data);
    });
  }
}
