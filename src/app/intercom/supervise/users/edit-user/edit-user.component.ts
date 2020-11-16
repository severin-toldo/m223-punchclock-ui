import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, switchMap, switchMapTo} from "rxjs/operators";
import {Observable, of, pipe} from "rxjs";
import {TimeEntry} from "../../../../model/time-entry.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterService} from "../../../../service/toaster.service";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../model/user.model";
import {superviseUsersRoute} from "../../../../shared/routes";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public form$: Observable<FormGroup>;
  private user$: Observable<User>;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private toaster: ToasterService,
              private userService: UserService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.user$ = this.route.params
      .pipe(switchMap(params => {
        if (params && params.id) {
          return this.userService.getById(params.id);
        } else {
          return of(new User());
        }
      }))
      .pipe(catchError(error => {
        this.toaster.error(error.errorMessage);
        return of(new User());
      }));

    this.form$ = this.user$
      .pipe(switchMap(user => {
        return of(this.fb.group({
          email: new FormControl({ value: user.email, disabled: true }), // no validtors since not editibale
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required]
        }));
      }))

  }

  public onSubmit(formValue: any): void {

    this.user$
      .pipe(switchMap(user => {
        user.firstName = formValue.firstName;
        user.lastName = formValue.lastName;
        delete user.roles;
        return this.userService.edit(user);
      }))
      .subscribe(() => {
        this.router.navigate(superviseUsersRoute());
        this.toaster.success();
      }, error => {
        this.toaster.error(error.errorMessage);
      });
  }
}
