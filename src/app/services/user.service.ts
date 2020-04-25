import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_USER_ID, USER_ROUTE } from 'src/constants/constants';
import { IUserType } from '../custom_types/user_types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUserId(input: string): Observable<IUserType> {
    const data = { input };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.put<IUserType>(GET_USER_ID, data, config);
  }

  public getUser(userid: number): Observable<IUserType> {
    return this.http.get<IUserType>(`${USER_ROUTE}/${userid}`);
  }
}
