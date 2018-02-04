import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  loggedIn: boolean;
  userEmail: string;
  constructor(public af:AngularFireAuth, private userService: UserService) { }

  ngOnInit() {
    this.af.authState.subscribe((authObj)=>{
      console.log(authObj);
      if(authObj){
        this.userEmail = authObj.email;
        this.loggedIn = true;
      } else {
        this.userEmail = null;
        this.loggedIn = false;
      }
    });
  }
  logout() {
    this.userService.logout();
  }

}
