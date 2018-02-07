import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorage } from 'angularfire2/storage';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../model/userModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  users: AngularFirestoreCollection<User>;
  authObj: any;
  userObservable: Observable<User>;
  userRegistered: boolean = false;
  userData: User = {
    username: "visitor",
    avatarURL: "../../assets/default-avatar.png",
    bio: "none"
  };
  error: string;
  constructor(
    private db: AngularFirestore, 
    private http: HttpClient, 
    private afAuth: AngularFireAuth,
    private af: AngularFireModule,
    private storage: AngularFireStorage
  ) {
    console.log('Users service injected');
    this.users = db.collection('/users');
    this.checkAuthState().subscribe((authObj) => {
      console.log(authObj);
      this.authObj = authObj;

      if (this.authObj) {
        this.userObservable = this.getUserByID(this.authObj.uid).valueChanges();
        this.userObservable.subscribe(
          userData => {
            console.log(userData);
            if (userData) {
              this.userRegistered = true;
              this.userData = userData;
            } else{
              this.userRegistered = false;
            }
          });
      }
    });
  }
  
  /*
  log in methods
  */
  login(email, password): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  signup(email, password): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUserByID(userID): AngularFirestoreDocument<User>{
    return this.users.doc(userID);
  }

  checkAuthState(): Observable<any>{
    return this.afAuth.authState;
  }

  createUserInDB(avatarFile: File, username: string, bio: string): Promise<any> {
    console.log('creating user doc');
    return this.storage.upload(avatarFile.name, avatarFile).then(result =>{
      console.log(result);
      this.users.doc(this.authObj.uid).set({
        avatarURL: result.downloadURL,
        username,
        bio
      });
    }).catch(error => {
      console.log(error);
    });
  }
}
