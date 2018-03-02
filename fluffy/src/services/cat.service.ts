import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class CatService {

  constructor(userService: UserService) { }

}
