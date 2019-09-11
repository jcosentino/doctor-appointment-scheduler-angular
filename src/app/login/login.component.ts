import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  loginUser(event: any): void {
    console.log(event.target);
    // this.userService.loginUser(this.username, this.password)
    //                  .subscribe(response => {
    //                    alert(response);
    //                  });
  }

}
