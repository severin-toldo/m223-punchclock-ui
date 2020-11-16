import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {loginUrl} from '../shared/urls';
import {map, tap} from 'rxjs/operators';
import {User} from '../model/user.model';
import {UserLoginRequest} from "../model/api/user-login-request.model";
import {AUTH_HEADER_NAME, AUTH_TOKEN_STORAGE_KEY, CURRENT_USER_STORAGE_KEY} from "../shared/constants";
import {Role} from "../model/role.enum";
import {NavService} from "./nav.service";
import {Router} from "@angular/router";
import {loginRoute} from "../shared/routes";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public login(loginRequest: UserLoginRequest): Observable<User> {
    return this.http.post<User>(loginUrl(), loginRequest, {observe: 'response', withCredentials: true})
      .pipe(tap(res => {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, res.headers.get(AUTH_HEADER_NAME));
        localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(res.body));
      }))
      .pipe(map(res => {
        return res.body;
      }));
  }

  public logout(): void {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
    this.router.navigate(loginRoute());
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentToken() && !!this.getCurrentUser();
  }

  public isAdmin(): boolean {
    return this.isLoggedIn() && this.getCurrentUser().roles.some(role => role.toString() === Role[Role.ADMIN].toString());
  }

  public getCurrentToken(): string {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  public getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_KEY));
  }
}
