import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './intercom/dashboard/dashboard.component';
import {AuthGuard} from './service/guards/auth.guard';
import {AdminGuard} from "./service/guards/admin.guard";
import {SuperviseComponent} from "./intercom/supervise/supervise.component";
import {CreateTimeEntryComponent} from "./intercom/time-entry/create-time-entry/create-time-entry.component";
import {EditTimeEntryComponent} from "./intercom/time-entry/edit-time-entry/edit-time-entry.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'AUTH.LOGIN'},
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {title: 'NAV.NAV_LINKS.DASHBOARD'},
  },
  {
    path: 'supervise',
    component: SuperviseComponent,
    canActivate: [AdminGuard],
    data: {title: 'NAV.NAV_LINKS.SUPERVISE'},
  },
  {
    path: 'time-entry/create',
    component: CreateTimeEntryComponent,
    canActivate: [AuthGuard],
    data: {title: 'TODO'},
  },
  {
    path: 'time-entry/edit',
    component: EditTimeEntryComponent,
    canActivate: [AuthGuard],
    data: {title: 'TODO'},
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
