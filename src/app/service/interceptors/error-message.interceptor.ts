import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorMessageInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      const translate = this.injector.get(TranslateService);

      if (error) {
        const errorCode =  error.error && error.error.errorCode;
        const httpStatusCode = error.error && error.error.httpStatusCode ? error.error.httpStatusCode :  error.status;

        if (errorCode) {
          error.errorMessage = 'ERROR_CODE.' + errorCode;
        } else if (httpStatusCode) {
          error.errorMessage = 'HTTP_STATUS_CODE.' + httpStatusCode;
        } else {
          error.errorMessage = 'ERROR_CODE.E1000';
        }

        error.errorMessage = translate.instant(error.errorMessage);
      }

      return throwError(error);
    }));
  }
}
