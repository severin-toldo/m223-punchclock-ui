import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterService} from "../../../../service/toaster.service";
import {UserService} from "../../../../service/user.service";
import {catchError, switchMap} from "rxjs/operators";
import {superviseUsersRoute} from "../../../../shared/routes";
import {UserInvitationRequest} from "../../../../model/api/user-invitation-request.model";

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  public form: FormGroup;
  private user$: Observable<User>;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private toaster: ToasterService,
              private userService: UserService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const usr = new UserInvitationRequest();
    usr.email = this.form.get('email').value;
    usr.password = this.form.get('password').value;
    usr.firstName = this.form.get('firstName').value;
    usr.lastName = this.form.get('lastName').value;

    this.userService.invite(usr)
      .subscribe(() => {
        this.router.navigate(superviseUsersRoute());
        this.toaster.success();
      }, error => {
        this.toaster.error(error.errorMessage);
      });
  }
}
