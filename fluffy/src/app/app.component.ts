import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: any[];
  constructor(db: AngularFireDatabase){
    db.list('/users')
      .valueChanges()
      .subscribe(users => {
        this.users = users;
        console.log(this.users);
      });
  }
}
