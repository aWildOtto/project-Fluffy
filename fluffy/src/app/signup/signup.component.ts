import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.signup(this.email, this.password);
  }
}
