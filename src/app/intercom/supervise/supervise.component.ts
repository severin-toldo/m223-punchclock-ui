import { Component, OnInit } from '@angular/core';
import { faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../service/auth.service";
import {TimeEntryService} from "../../service/time-entry.service";
import {Observable, of} from "rxjs";
import {TimeEntry} from "../../model/time-entry.model";
import {catchError} from "rxjs/operators";
import {ToasterService} from "../../service/toaster.service";
import {createTimeEntryRoute, superviseCategoriesRoute, superviseRoute, superviseUsersRoute} from "../../shared/routes";

@Component({
  selector: 'app-supervise',
  templateUrl: './supervise.component.html',
  styleUrls: ['./supervise.component.scss']
})
export class SuperviseComponent implements OnInit {

  public readonly faUsers = faUsers;
  public readonly faCalendarAlt = faCalendarAlt;
  public readonly superviseUsersRoute = superviseUsersRoute;
  public readonly superviseCategoriesRoute = superviseCategoriesRoute;

  public allTimeEntries$: Observable<TimeEntry[]>;

  constructor(private timeEntryService: TimeEntryService,
              private toaster: ToasterService) {
  }

  public ngOnInit(): void {
    this.allTimeEntries$ = this.timeEntryService.getAll()
      .pipe(catchError(error => {
        this.toaster.error(error.errorMessage);
        return of([]);
      }));
  }
}
