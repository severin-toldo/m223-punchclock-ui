import {combineLatest, Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormComponentInterface} from "../../model/components/form-component.interface";
import {TimeEntry} from "../../model/time-entry.model";
import {Category} from "../../model/category.model";
import {CategoryService} from "../../service/category.service";
import {DatePipe} from "@angular/common";


export abstract class AbstractTimeEntryComponent implements FormComponentInterface {

  protected timeEntry$: Observable<TimeEntry>;
  public timeEntryForm$: Observable<FormGroup>;
  public categories$: Observable<Category[]>;


  protected constructor(protected fb: FormBuilder,
                        protected datePipe: DatePipe,
                        protected categoryService: CategoryService) {
  }

  public init(): void {
    this.timeEntry$ = this.getTimeEntry();
    this.categories$ = this.categoryService.getAll();
    this.timeEntryForm$ = this.getForm();
  }

  public getForm(): Observable<FormGroup> {
    return this.timeEntry$
      .pipe(switchMap(timeEntry => {
        return of(
          this.fb.group({
            checkIn: [this.convertToDateTimePicker(timeEntry.checkIn), [Validators.required]],
            checkOut: [this.convertToDateTimePicker(timeEntry.checkOut), Validators.required],
            category: [timeEntry.category && timeEntry.category.id],
          })
        );
      }));
  }

  protected convertToDateTimePicker(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm');
  }

  protected convertFromDateTimePicker(val: string): Date {
    return new Date(val);
  }

  protected convertFormValueToTimeEntry(formValue: any): Observable<TimeEntry> {
    return this.timeEntry$
      .pipe(map(timeEntry => {
        timeEntry.checkIn = this.convertFromDateTimePicker(formValue.checkIn);
        timeEntry.checkOut = this.convertFromDateTimePicker(formValue.checkOut);

        if (formValue.category) {
          const c = new Category();
          c.id = formValue.category;
          timeEntry.category = c;
        } else {
          timeEntry.category = null;
        }

        return timeEntry;
      }));
  }

  protected abstract getTimeEntry(): Observable<TimeEntry>;

  public abstract onSubmit(formValue: any): void;

}

