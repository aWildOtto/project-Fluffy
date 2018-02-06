import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  constructor(private userService: UserService, 
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // this.userService.userObservable.subscribe(authObj => {
    //   if (authObj){
    //     if(this.userService.userRegistered){
    //       this.router.navigate(['/']);
    //     } else {
    //       this.router.navigate(['/register']);
    //     }
    //   }
    // })
  }

  onSubmit() {
    this.userService.signup(this.email, this.password)
      .then( result => {
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
  signupWithGoogle(){
    this.userService.loginWithGoogle()
      .then(result => {
        console.log(result);
        if (result.uid) {
          if (this.userService.userRegistered) {
            this.router.navigate(['/register']);
          } else {
            this.router.navigate(['/']);
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.flashMessage.show(error.message, {cssClass: 'alert-danger', timeOut: 5000});
      })
      ;
  }

}
