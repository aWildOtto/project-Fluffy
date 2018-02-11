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

import { UserData } from '../model/userModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  users: AngularFirestoreCollection<UserData>;
  authObj: any;
  userObservable: Observable<UserData>;
  userRegistered: boolean = false;
  userData: UserData = {
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
    this.users = db.collection('users');
    this.checkAuthState().subscribe((authObj) => {
      this.authObj = authObj;

      if (this.authObj) {
        this.userObservable = this.getUserByID(this.authObj.uid).valueChanges();
        this.userObservable.subscribe(
          userData => {
            if (userData) {
              this.userRegistered = true;
              this.userData = userData;
            } else{
              this.userRegistered = false;
              this.userData = {
                username: "visitor",
                avatarURL: "../../assets/default-avatar.png",
                bio: "none"
              }
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

  getUserByID(userID): AngularFirestoreDocument<UserData>{
    return this.users.doc(userID);
  }

  checkAuthState(): Observable<any>{
    return this.afAuth.authState;
  }

  createUserInDB(avatarFile: File, username: string, bio: string): Promise<any> {
    console.log('creating user doc');
    return this.storage.upload(avatarFile.name, avatarFile).then(result =>{
      // TODO: have to ensure unique username
      this.users.doc(this.authObj.uid).set({
        avatarURL: result.downloadURL,
        username,
        bio
      });
    }).catch(error => {
      console.log(error);
    });
  }

  getUserByUsername(username: string){
    return this.db.collection('users', ref => ref.where('username', "==", username)).valueChanges();
  }
}
