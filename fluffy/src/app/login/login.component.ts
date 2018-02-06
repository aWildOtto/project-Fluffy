import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email:string;
  password:string;
  

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.router.navigate(['/']);
  }

  onSubmit() {
    this.userService.login(this.email, this.password);
  }
  loginWithGoogle() {
    this.userService.loginWithGoogle().then(result => {
      // console.log(result);
      if(result.user){
        this.router.navigate(['/']);
      }
    });
  }
}
