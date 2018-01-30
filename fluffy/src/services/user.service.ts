import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { 
    console.log("userService injected");
  }
  
  /*
  log in authentificate
  */
  authentificate(username, password): void {
    console.log(username, password);
  }

  postNewUser(): void {

  }

}
