import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.userService.checkAuthState().subscribe
  }

  onSubmit() {
    this.userService.signup(this.email, this.password);
  }
  signupWithGoogle(){
    this.userService.loginWithGoogle().then(result => {
      if(result.user){
        this.router.navigate(['/']);
      }
    });
  }
}
