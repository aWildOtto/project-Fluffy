import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from "../../model/userModel";
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: any;
  userObservable: Observable<User>;
  userData: User = {
    username: "visitor",
    avatarURL: "../../assets/default-avatar.png",
    bio: "none"
  };
  userRegistered: boolean = false;

  constructor(private userService: UserService, private router: Router) {
  }
  
  ngOnInit() {
    this.userService.checkAuthState().subscribe((authObj)=>{
      console.log(authObj);
      this.user = authObj;

      if(this.user){
        this.userObservable = this.userService.getUserByID(this.user.uid).valueChanges();
        this.userObservable.subscribe(
          userData => {
            console.log(userData);
            if (userData) {
              this.userRegistered = true;
              this.userData = userData;
            }
          });
      }
    });
  }

  logout() {
    this.userService.logout();
  }
  userButton() {
    if(this.user && this.userRegistered){
      this.router.navigate(['/profile/'+this.userData.username]);
    } else {
      this.router.navigate(['/register']);
    }
    console.log('hi');
  }

}
