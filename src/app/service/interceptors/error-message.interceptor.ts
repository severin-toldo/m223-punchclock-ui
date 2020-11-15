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

  // TODO
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      const translate = this.injector.get(TranslateService);

      if (error.status) {
        error.errorMessage = error.status + ' - ' + translate.instant('HTTP_STATUS_CODE.' + error.status);
      } else {
        error.errorMessage = translate.instant('GENERAL.UNKNOWN_ERROR');
      }

      return throwError(error);
    }));
  }
}
