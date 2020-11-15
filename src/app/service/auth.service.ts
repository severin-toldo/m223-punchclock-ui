import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {loginUrl} from '../shared/urls';
import {map} from 'rxjs/operators';
import {User} from '../model/user.model';
import {UserLoginRequest} from "../model/api/user-login-request.model";
import {AUTH_HEADER_NAME, AUTH_TOKEN_STORAGE_KEY, CURRENT_USER_STORAGE_KEY} from "../shared/constants";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  // TODO reponse will be in body and use local and session sotrage, remove cookie
  public login(loginRequest: UserLoginRequest): Observable<User> {
    return this.http.post<UserLoginRequest>(loginUrl(), loginRequest, {observe: 'response'})
      .pipe(map(authRes => {
        const token = authRes.headers.get(AUTH_HEADER_NAME);

        // TODO set user by reponse

        return new User();
      }));
  }

  public logout(): void {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY)
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) && !!localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  }

  public getCurrentToken(): string {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_KEY));
  }
}
