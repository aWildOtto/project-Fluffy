import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  constructor(private userService: UserService, private router: Router) {
  }
  
  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
  userButton() {
    if(this.userService.authObj && this.userService.userRegistered){
      this.router.navigate(['/profile/'+this.userService.userData.username]);
    } else {
      this.router.navigate(['/register']);
    }
  }

}
