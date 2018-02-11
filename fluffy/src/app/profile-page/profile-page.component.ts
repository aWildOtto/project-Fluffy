import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../model/userModel';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userData: Observable<{}[]>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userData = this.userService.getUserByUsername(params['id']);
      this.userData.subscribe(data => {
        console.log("user data is ", data);
      });
      console.log(this.userData);
    });
  }


}
