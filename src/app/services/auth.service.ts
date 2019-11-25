import { Injectable, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AUTHENTICATE, TOKEN_NAME } from '../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(LOCAL_STORAGE) private lStorage: WebStorageService,
              private http: HttpClient) { }

  public getLocalStorage(id: string): boolean {
    return this.lStorage.get(id);
  }

  public isUserLoggedIn(id: string): boolean {
    return this.lStorage.get(id) !== null;
  }

  public authenticate(username: string, password: string): Observable<boolean> {
    const data = { username, password };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };

    return this.http.post<boolean>(`${'http://127.0.0.1:5000'}${AUTHENTICATE}`, data, config);
  }

  public login(): void {
    this.lStorage.set(TOKEN_NAME, true);
  }

  public logout(): void {
    this.lStorage.remove(TOKEN_NAME);
  }
}
