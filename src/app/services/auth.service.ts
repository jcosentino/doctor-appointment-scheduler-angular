import { Injectable } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private lStorage: WebStorageService) { }

  public getLocalStorage(id: string): boolean {
    return this.lStorage.get(id);
  }

  public isUserLoggedIn(id: string): boolean {
    return this.lStorage.get(id) !== null;
  }
}

