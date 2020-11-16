import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

export interface FormComponentInterface {

  getForm(): Observable<FormGroup>;

  onSubmit(formValue: any): void;

  init(): void;

}
