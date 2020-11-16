import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimeEntry} from "../../model/time-entry.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {formatUser } from 'src/app/shared/util/other.util';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import {TimeEntryService} from "../../service/time-entry.service";
import {ToasterService} from "../../service/toaster.service";
import {Router} from "@angular/router";
import {editTimeEntryRoute} from "../../shared/routes";


@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss']
})
export class TimeEntriesTableComponent implements OnInit, AfterViewInit {

  @Input() public timeEntries: TimeEntry[];
  @Input() public displayUserColumn = false;
  @Input() public title: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<TimeEntry>;
  public hasEntries = false;

  public readonly formatUser = formatUser;
  public readonly faTimes = faTimes;
  public readonly faEdit = faEdit;


  constructor(private timeEntryService: TimeEntryService,
              private toaster: ToasterService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
    this.hasEntries = this.timeEntries && this.timeEntries.length > 0;

    if (this.hasEntries) {
      this.dataSource = new MatTableDataSource<TimeEntry>(this.timeEntries);
    }
  }

  public ngAfterViewInit(): void {
    if (this.hasEntries) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  public differenceInHours(date1: string, date2: string): number {
    const diff = (new Date(date1).getTime() - new Date(date2).getTime()) / 1000 / 60 / 60;
    return Math.abs(Math.round(diff * 100) / 100);
  }

  public onDelete(id: number) {
    this.timeEntryService.delete(id)
      .subscribe(() => {
        this.toaster.success();
        this.timeEntries = this.timeEntries.filter(e => e.id !== id);
        this.dataSource.data = this.timeEntries;
        this.hasEntries = this.timeEntries && this.timeEntries.length > 0;
      }, error => {
        this.toaster.error(error.errorMessage);
      });
  }

  public onEdit(id: number) {
    this.router.navigate(editTimeEntryRoute(id));
  }

  private getDisplayedColumns() {
    if (this.displayUserColumn) {
      return ['checkIn', 'checkOut', 'category', 'user', 'hours'];
    }

    return ['checkIn', 'checkOut', 'category', 'hours'];
  }
}



