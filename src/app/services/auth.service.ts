import { Injectable, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AUTHENTICATE, TOKEN_NAME, REGISTER_USER } from 'src/constants/constants';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public persistedUsername: BehaviorSubject<string>;

  constructor(@Inject(LOCAL_STORAGE) private lStorage: WebStorageService,
              private http: HttpClient) {
                this.persistedUsername = new BehaviorSubject('');
              }

  public getLocalStorage(id: string): boolean {
    return this.lStorage.get(id);
  }

  public isUserLoggedIn(id: string): boolean {
    return this.lStorage.get(id) !== null;
  }

  public authenticate(username: string, password: string): Observable<string> {
    const data = { username, password };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<string>(AUTHENTICATE, data, config);
  }

  public login(username: string): void {
    this.lStorage.set(TOKEN_NAME, true);
    this.persistedUsername.next(username);
  }

  public logout(): void {
    this.lStorage.remove(TOKEN_NAME);
    this.persistedUsername.next('');
  }

  public register(username: string,
                  password: string,
                  email: string,
                  securityQuesNum: number,
                  securityAnswer: string
    ): Observable<string> {
    const data = { username,
                   password,
                   email,
                   sec_ques_num: securityQuesNum,
                   sec_ques_ans: securityAnswer };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<string>(REGISTER_USER, data, config);
  }
}
