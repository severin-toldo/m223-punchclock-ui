import { Component, OnInit } from '@angular/core';
import {TimeEntry} from "../../../model/time-entry.model";
import {AbstractTimeEntryComponent} from "../abstract-time-entry.component";
import {Observable, of} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {CategoryService} from "../../../service/category.service";
import {Router} from "@angular/router";
import {ToasterService} from "../../../service/toaster.service";
import {TimeEntryService} from "../../../service/time-entry.service";
import {switchMap} from "rxjs/operators";
import {User} from "../../../model/user.model";
import {dashboardRoute} from "../../../shared/routes";

@Component({
  selector: 'app-create-time-entry',
  templateUrl: './create-time-entry.component.html',
  styleUrls: ['./create-time-entry.component.scss']
})
export class CreateTimeEntryComponent extends AbstractTimeEntryComponent implements OnInit {

  constructor(protected fb: FormBuilder,
              protected datePipe: DatePipe,
              protected categoryService: CategoryService,
              protected toaster: ToasterService,
              protected timeEntryService: TimeEntryService,
              protected router: Router) {
    super(fb, datePipe, categoryService);
  }

  public ngOnInit(): void {
    this.init();
  }

  protected getTimeEntry(): Observable<TimeEntry> {
    return of(new TimeEntry());
  }

  public onSubmit(formValue: any): void {
    this.convertFormValueToTimeEntry(formValue)
      .pipe(switchMap(timeEntry => {
        timeEntry.user = new User();
        return this.timeEntryService.create(timeEntry);
      }))
      .subscribe(() => {
        this.toaster.success();
        this.router.navigate(dashboardRoute());
      }, error => {
        this.toaster.error(error.errorMessage)
      })
  }
}
