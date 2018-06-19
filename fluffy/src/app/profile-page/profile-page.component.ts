import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../../model/userModel';
import { Observable } from 'rxjs/Observable';
import { CatData } from '../../model/catModel';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userData: Observable<{}[]>;
  showAddButton: boolean = false;
  aCat: CatData = {
    name: "ruby",
    breed: "some breed",
    avatarURL: "https://firebasestorage.googleapis.com/v0/b/fluffy-fb413.appspot.com/o/IMG_5693.JPG?alt=media&token=b302fd6b-fae1-4c51-841c-354b511b83d8",
    gender: "female",
    status: "open for adoption",
    catID: 1
  }
  cats: CatData[] = [
    this.aCat,
    this.aCat,
    this.aCat,
    this.aCat,
    this.aCat
  ];
  selectedCat: CatData;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.route.queryParams.subscribe(queryParams=>{
        if(queryParams['cat']){
          this.selectedCat = this.aCat;
        } else{
          this.selectedCat = null;
        }
      })
      this.userData = this.userService.getUserByUsername(params['id']);
      this.userData.subscribe(data => {
        // console.log(data);
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

  addCatPopup(){
    console.log("add cat clicked");
    
  }
}
