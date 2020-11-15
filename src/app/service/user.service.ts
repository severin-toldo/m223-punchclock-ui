import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {
  changePasswordUrl,
  deleteUserUrl,
  editUserUrl,
  getAllUsersUrl,
  getUserByIdUrl,
  inviteUserUrl
} from "../shared/urls";
import {UserChangePasswordRequest} from "../model/api/user-change-password-request.model";
import {UserInvitationRequest} from "../model/api/user-invitation-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<User> {
    return this.http.get<User>(getAllUsersUrl());
  }

  public getById(id: number): Observable<User> {
    return this.http.get<User>(getUserByIdUrl(id));
  }

  public edit(user: User): Observable<User> {
    return this.http.patch<User>(editUserUrl(user.id), user);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(deleteUserUrl(id));
  }

  public changePassword(id: number, userChangePasswordRequest: UserChangePasswordRequest): Observable<User> {
    return this.http.put<User>(changePasswordUrl(id), userChangePasswordRequest)
  }

  public invite(userInvitationRequest: UserInvitationRequest): Observable<User> {
    return this.http.post<User>(inviteUserUrl(), userInvitationRequest);
  }
}
