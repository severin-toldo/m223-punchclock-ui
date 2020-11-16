import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {TimeEntry} from "../../model/time-entry.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {formatUser } from 'src/app/shared/util/other.util';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss']
})
export class TimeEntriesTableComponent implements OnInit, AfterViewInit {

  @Input() public timeEntries: TimeEntry[];
  @Input() public displayUserColumn = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns: string[] = ['checkIn', 'checkOut', 'category', 'hours'];
  public dataSource: MatTableDataSource<TimeEntry>;
  public hasEntries = false;

  public readonly formatUser = formatUser;


  constructor() {
  }

  public ngOnInit(): void {
    this.hasEntries = this.timeEntries && this.timeEntries.length > 0;

    if (this.hasEntries) {
      this.dataSource = new MatTableDataSource<TimeEntry>(this.timeEntries);
    }

    if (this.displayUserColumn) {
      this.displayedColumns.push('user');
    }
  }

  public ngAfterViewInit(): void {
    if (this.hasEntries) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  public differenceInHours(date1: string, date2: string): number {
    var diff = (new Date(date1).getTime() - new Date(date2).getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }
}



