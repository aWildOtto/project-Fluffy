import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user-info',
  templateUrl: './add-user-info.component.html',
  styleUrls: ['./add-user-info.component.scss']
})
export class AddUserInfoComponent implements OnInit {

  avatarFile: File;
  username: string;
  bio: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.checkAuthState().subscribe(user => {
      if (user) {
        this.userService.userObservable.subscribe(userData => {
          if (userData) {
            this.router.navigate(['/']);
          } 
        })
      }
    });
  }

  registerUser(){
    this.userService.createUserInDB(this.avatarFile, this.username, this.bio);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.avatarFile = fileList[0];
     
    }
  }
}
