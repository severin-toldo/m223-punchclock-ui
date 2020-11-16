import { Component, OnInit } from '@angular/core';
import { faClock, faUsers } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../service/auth.service";
import {TimeEntryService} from "../../service/time-entry.service";
import {Observable, of} from "rxjs";
import {TimeEntry} from "../../model/time-entry.model";
import {catchError} from "rxjs/operators";
import {ToasterService} from "../../service/toaster.service";
import {createTimeEntryRoute, superviseRoute} from "../../shared/routes";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public readonly faClock = faClock;
  public readonly faUsers = faUsers;
  public readonly createTimeEntryRoute = createTimeEntryRoute;
  public readonly superviseRoute = superviseRoute;

  public isAdmin = false;
  public myTimeEntries$: Observable<TimeEntry[]>;

  constructor(private authService: AuthService,
              private timeEntryService: TimeEntryService,
              private toaster: ToasterService) {
  }

  public ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    this.myTimeEntries$ = this.timeEntryService.getMine()
      .pipe(catchError(error => {
        this.toaster.error(error.errorMessage);
        return of([]);
      }));
  }

}
