import { Injectable } from '@angular/core';
import { SEC_QUESTION_ARR, FORGOT_PASSWORD } from 'src/constants/constants';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionsService {
  private MAX_INDEX = SEC_QUESTION_ARR.length - 1;

  constructor(private http: HttpClient) { }

  public getSecurityQuestion(id: number): string {
    return this.checkQuesIdRange(id) ? SEC_QUESTION_ARR[id] : SEC_QUESTION_ARR[0];
  }

  public generateSecurityQuesId(): number {
    return Math.floor(Math.random() * this.MAX_INDEX) + 0;
  }

  public forgotPassword(email: string, password: string, secAns: string): Observable<string> {
    const data = { email, password, sec_ques_ans: secAns };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.patch<string>(FORGOT_PASSWORD, data, config);
  }

  private checkQuesIdRange(id: number): boolean {
    return !isNaN(id) && id >= 0 && id <= this.MAX_INDEX;
  }
}
