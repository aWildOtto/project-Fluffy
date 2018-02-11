import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../model/userModel';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userData: Observable<{}[]>;
  showAddButton: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userData = this.userService.getUserByUsername(params['id']);
      this.userData.subscribe(data => {
        console.log(data);
        if(data.length < 1){
          this.router.navigate(['/404']);
        }
      })
      this.userService.checkAuthState().subscribe(result => {
        if(result){
          this.userService.getUserByID(result.uid).valueChanges().subscribe(data => {
            if(data.username === params['id']){
              this.showAddButton = true;
            } else {
              this.showAddButton = false;
            }
          });
        }
      });
    });
  }


}
