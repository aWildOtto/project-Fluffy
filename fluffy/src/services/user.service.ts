import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class UserService {

  constructor() { 
    console.log("userService injected");
  }
  
  /*
  log in authentificate
  */
  authentificate(username, password): void{
    console.log(username, password);
  }

  postNewUser(): void {

  }

}
