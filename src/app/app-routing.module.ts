import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './intercom/dashboard/dashboard.component';
import {AuthGuard} from './service/guards/auth.guard';
import {AdminGuard} from "./service/guards/admin.guard";
import {SuperviseComponent} from "./intercom/supervise/supervise.component";
import {CreateTimeEntryComponent} from "./intercom/time-entry/create-time-entry/create-time-entry.component";
import {EditTimeEntryComponent} from "./intercom/time-entry/edit-time-entry/edit-time-entry.component";
import {CategoriesComponent} from "./intercom/supervise/categories/categories.component";
import {CreateCategoryComponent} from "./intercom/supervise/categories/create-category/create-category.component";
import {EditCategoryComponent} from "./intercom/supervise/categories/edit-category/edit-category.component";

// TODO use children
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'LOGIN.LOGIN'},
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {title: 'NAV.NAV_LINKS.DASHBOARD'},
  },
  {
    path: 'time-entry/create',
    component: CreateTimeEntryComponent,
    canActivate: [AuthGuard],
    data: {title: 'INTERCOM.TIME_ENTRY.CREATE_TIME_ENTRY.TITLE'},
  },
  {
    path: 'time-entry/edit/:id',
    component: EditTimeEntryComponent,
    canActivate: [AuthGuard],
    data: {title: 'INTERCOM.TIME_ENTRY.EDIT_TIME_ENTRY.TITLE'},
  },
  {
    path: 'supervise',
    component: SuperviseComponent,
    canActivate: [AdminGuard],
    data: {title: 'NAV.NAV_LINKS.SUPERVISE'},
  },
  {
    path: 'supervise/categories',
    component: CategoriesComponent,
    canActivate: [AdminGuard],
    data: {title: 'INTERCOM.SUPERVISE.CATEGORIES.TITLE'},
  },
  {
    path: 'supervise/category/create',
    component: CreateCategoryComponent,
    canActivate: [AdminGuard],
    data: {title: 'INTERCOM.SUPERVISE.CATEGORIES.CREATE_CATEGORY'},
  },
  {
    path: 'supervise/category/edit/:id',
    component: EditCategoryComponent,
    canActivate: [AdminGuard],
    data: {title: 'INTERCOM.SUPERVISE.CATEGORIES.EDIT_CATEGORY'},
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
