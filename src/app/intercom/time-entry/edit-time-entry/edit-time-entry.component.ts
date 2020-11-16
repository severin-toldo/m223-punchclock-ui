import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {TimeEntry} from "../../../model/time-entry.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ToasterService} from "../../../service/toaster.service";
import {TimeEntryService} from "../../../service/time-entry.service";
import {AbstractTimeEntryComponent} from "../abstract-time-entry.component";
import {DatePipe} from "@angular/common";
import {CategoryService} from "../../../service/category.service";
import {dashboardRoute} from "../../../shared/routes";

@Component({
  selector: 'app-edit-time-entry',
  templateUrl: './edit-time-entry.component.html',
  styleUrls: ['./edit-time-entry.component.scss']
})
export class EditTimeEntryComponent extends AbstractTimeEntryComponent {

  constructor(protected fb: FormBuilder,
              protected datePipe: DatePipe,
              protected categoryService: CategoryService,
              protected route: ActivatedRoute,
              protected toaster: ToasterService,
              protected timeEntryService: TimeEntryService,
              protected router: Router) {
    super(fb, datePipe, categoryService);
  }

  public ngOnInit(): void {
    super.init();
  }

  protected getTimeEntry(): Observable<TimeEntry> {
    return this.route.params
      .pipe(switchMap(params => {
        if (params && params.id) {
          return this.timeEntryService.getById(params.id);
        } else {
          return of(new TimeEntry());
        }
      }))
      .pipe(catchError(error => {
        this.toaster.error(error.errorMessage);
        return of(new TimeEntry());
      }));
  }

  public onSubmit(formValue: any): void {
    this.convertFormValueToTimeEntry(formValue)
      .pipe(switchMap(timeEntry => {
        delete timeEntry.user.roles;
        return this.timeEntryService.edit(timeEntry)
      }))
      .subscribe(() => {
        this.toaster.success();
        this.router.navigate(dashboardRoute());
      }, error => {
        this.toaster.error(error.errorMessage)
      });
  }
}
