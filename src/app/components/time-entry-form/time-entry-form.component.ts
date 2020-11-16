import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TimeEntry} from "../../model/time-entry.model";
import {Category} from "../../model/category.model";

@Component({
  selector: 'app-time-entry-form',
  templateUrl: './time-entry-form.component.html',
  styleUrls: ['./time-entry-form.component.scss']
})
export class TimeEntryFormComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public timeEntry: TimeEntry;
  @Input() public categories: Category[];
  @Input() public title: string;
  @Input() public submitText: string;

  @Output() public onSubmit = new EventEmitter<any>();


  constructor() {
  }

  public ngOnInit(): void {
  }

  public onSubmitFn(): void {
    this.onSubmit.emit(this.form.value);
  }
}
