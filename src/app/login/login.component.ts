import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {ToasterService} from '../service/toaster.service';
import {dashboardRoute} from '../shared/routes';
import {UserLoginRequest} from "../model/api/user-login-request.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;


  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private toaster: ToasterService) {
  }

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(dashboardRoute());
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    const userLoginRequest = new UserLoginRequest();
    userLoginRequest.email = this.loginForm.get('email').value;
    userLoginRequest.password = this.loginForm.get('password').value;

    this.authService.login(userLoginRequest)
      .subscribe(() => {
        this.router.navigate(dashboardRoute());
      }, error => {
        this.toaster.error(error.errorMessage);
      });
  }
}
