import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';
import {AUTH_HEADER_NAME} from "../../shared/constants";

@Injectable()
export class HttpRequestInterceptor implements HttpRequestInterceptor {

  constructor(private authService: AuthService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      const clonedRequest = req.clone({
        headers: req.headers.set(AUTH_HEADER_NAME, this.authService.getCurrentToken())
      });

      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}
