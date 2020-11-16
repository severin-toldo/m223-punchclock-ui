import {Injectable} from '@angular/core';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {isBlankOrEmpty} from "../shared/util/other.util";

export const TOASTR_CONFIG = { positionClass: 'toast-bottom-right' };

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService,
              private  translate: TranslateService) {
  }

  public error(message?: string, title?: string): ActiveToast<any> {
    title = title ? title : 'GENERAL.ERROR';
    message = isBlankOrEmpty(message) ? 'GENERAL.ERROR' : message;

    return this.toastr.error(this.translate.instant(message), this.translate.instant(title), TOASTR_CONFIG);
  }

  public success(message?: string, title?: string): ActiveToast<any> {
    title = title ? title : 'GENERAL.SUCCESS';
    message = isBlankOrEmpty(message) ? 'GENERAL.SUCCESS' : message;

    return this.toastr.success(this.translate.instant(message), this.translate.instant(title), TOASTR_CONFIG);
  }
}
