import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TimeEntry} from "../../model/time-entry.model";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs";
import {Category} from "../../model/category.model";
import {CategoryService} from "../../service/category.service";
import {TimeEntryService} from "../../service/time-entry.service";
import {ToasterService} from "../../service/toaster.service";
import {Router} from "@angular/router";
import {dashboardRoute} from "../../shared/routes";
import {User} from "../../model/user.model";

@Component({
  selector: 'app-time-entry-form',
  templateUrl: './time-entry-form.component.html',
  styleUrls: ['./time-entry-form.component.scss']
})
export class TimeEntryFormComponent implements OnInit {

  @Input() public timeEntry: TimeEntry;

  public timeEntryForm: FormGroup;
  public isEditMode = false;
  public categories$: Observable<Category[]>;


  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private categoryService: CategoryService,
              private timeEntryService: TimeEntryService,
              private toaster: ToasterService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.isEditMode = !!(this.timeEntry && this.timeEntry.id);
    this.categories$ = this.categoryService.getAll();

    this.timeEntryForm = this.fb.group({
      checkIn: [this.convertToDateTimePicker(this.timeEntry.checkIn), [Validators.required]],
      checkOut: [this.convertToDateTimePicker(this.timeEntry.checkOut), Validators.required],
      category: [this.timeEntry.category && this.timeEntry.category.id],
    });
  }

  public saveTimeEntry(): void {
    this.timeEntry.checkIn = this.convertFromDateTimePicker(this.timeEntryForm.get('checkIn').value);
    this.timeEntry.checkOut = this.convertFromDateTimePicker(this.timeEntryForm.get('checkOut').value);

    if (this.timeEntryForm.get('category').value) {
      const c = new Category();
      c.id = this.timeEntryForm.get('category').value;
      this.timeEntry.category = c;
    } else {
      this.timeEntry.category = null;
    }

    if (this.isEditMode) {
      this.timeEntryService.edit(this.timeEntry)
        .subscribe(() => {
          this.toaster.success();
          this.router.navigate(dashboardRoute());
        }, error => {
          this.toaster.error(error.errorMessage)
        });
    } else {
      this.timeEntry.user = new User();
      this.timeEntryService.create(this.timeEntry)
        .subscribe(() => {
          this.toaster.success();
          this.router.navigate(dashboardRoute());
        }, error => {
          this.toaster.error(error.errorMessage)
        })
    }


  }

  private convertToDateTimePicker(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm');
  }

  private convertFromDateTimePicker(val: string): Date {
    return new Date(val);
  }

}
