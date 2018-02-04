import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email:string;
  passowrd:string;
  

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.email, this.passowrd);
  }
  loginWithGoogle() {
    this.userService.loginWithGoogle();
  }
}
