import { Injectable, Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AUTHENTICATE, TOKEN_NAME, REGISTER_USER, EMAIL } from 'src/constants/constants';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public persistedEmail: BehaviorSubject<string>;

  constructor(@Inject(LOCAL_STORAGE) private lStorage: WebStorageService,
              private http: HttpClient) {
    this.initializePersistedEmail();
  }

  public getLocalStorage(id: string): string {
    return this.lStorage.get(id);
  }

  public isUserLoggedIn(id: string): boolean {
    return this.lStorage.get(id) !== null;
  }

  public authenticate(email: string, password: string): Observable<string> {
    const data = { email, password };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<string>(AUTHENTICATE, data, config);
  }

  public login(email: string): void {
    this.lStorage.set(TOKEN_NAME, true);
    this.lStorage.set(EMAIL, email);
    this.persistedEmail.next(email);
  }

  public logout(): void {
    this.lStorage.remove(TOKEN_NAME);
    this.lStorage.remove(EMAIL);
    this.persistedEmail.next('');
  }

  public register(email: string,
                  password: string,
                  securityQuesNum: number,
                  securityAnswer: string
    ): Observable<string> {
    const data = { email,
                   password,
                   sec_ques_num: securityQuesNum,
                   sec_ques_ans: securityAnswer };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<string>(REGISTER_USER, data, config);
  }

  private initializePersistedEmail(): void {
    this.persistedEmail =
                  new BehaviorSubject(this.getLocalStorage(EMAIL));
  }
}
