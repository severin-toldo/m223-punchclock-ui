import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {AuthService} from "../auth.service";

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(error => {
      if (error && error.error && error.error.errorCode === 'E1005') {
        const authService = this.injector.get(AuthService);
        authService.logout();
      }

      return throwError(error);
    }));
  }
}
