import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable, of} from "rxjs";
import {catchError, defaultIfEmpty, startWith, switchMap, switchMapTo} from "rxjs/operators";
import {TimeEntry} from "../../../model/time-entry.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ToasterService} from "../../../service/toaster.service";
import {TimeEntryService} from "../../../service/time-entry.service";

@Component({
  selector: 'app-edit-time-entry',
  templateUrl: './edit-time-entry.component.html',
  styleUrls: ['./edit-time-entry.component.scss']
})
export class EditTimeEntryComponent implements OnInit {

  public timeEntry$: Observable<TimeEntry>;


  constructor(private route: ActivatedRoute,
              private toaster: ToasterService,
              private timeEntryService: TimeEntryService) {
  }

  public ngOnInit(): void {
    this.timeEntry$ = this.route.params
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
}
