import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  cats: any[];
  error: string;
  constructor(private db: AngularFirestore, private http: HttpClient, public afAuth: AngularFireAuth) {
    // db.collection('/cats')
    //   .valueChanges()
    //   .subscribe(cats => {
    //     this.cats = cats;
    //     console.log(this.cats);
    //   });
    console.log('Users service injected');
  }
  
  /*
  log in authentificate
  */
  login(email, password): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle(): any {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  signup(email, password): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);

  }

  signupWithGoogle() : any {
    // return this.afAuth.auth.create
  }
}
