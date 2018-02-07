import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginEmail:string;
  loginPassword:string;
  signupEmail:string;
  signupPassword:string;
  

  constructor(
    private userService: UserService, 
    private router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.userService.checkAuthState().subscribe(user => {
      if (user) {
        this.userService.userObservable.subscribe(userData => {
          if(userData){
            this.router.navigate(['/']);
          } else{
            this.router.navigate(['/register']);
          }

        })
      }
    });
  }

  onLoginSubmit() {
    this.userService.login(this.loginEmail, this.loginPassword)
      .then(result => {
        console.log(result);
        if (result.uid) {
          if (this.userService.userRegistered) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/register']);
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.flashMessage.show(error.message, { cssClass: 'alert-danger', timeOut: 5000 });
      });;
  }

  onSignupSubmit() {
    this.userService.signup(this.signupEmail, this.signupPassword)
      .then(result => {
        console.log(result);
        if (result.uid) {
          if (this.userService.userRegistered) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/register']);
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.flashMessage.show(error.message, { cssClass: 'alert-danger', timeOut: 5000 });
      });;
  }

  loginWithGoogle() {
    this.userService.loginWithGoogle().then(result => {
      console.log(result);
      if (result.uid) {
        if (this.userService.userRegistered) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/register']);
        }
      }
    })
      .catch(error => {
        console.log(error);
        this.flashMessage.show(error.message, { cssClass: 'alert-danger', timeOut: 5000 });
      });
  }
}
