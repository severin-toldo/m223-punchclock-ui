import { Component, OnInit } from '@angular/core';
import {TimeEntry} from "../../../model/time-entry.model";

@Component({
  selector: 'app-create-time-entry',
  templateUrl: './create-time-entry.component.html',
  styleUrls: ['./create-time-entry.component.scss']
})
export class CreateTimeEntryComponent implements OnInit {

  public timeEntry = new TimeEntry();

  constructor() {
  }

  public ngOnInit(): void {
  }

}
