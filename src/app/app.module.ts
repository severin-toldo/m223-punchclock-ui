import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { DashboardComponent } from './intercom/dashboard/dashboard.component';
import {HttpRequestInterceptor} from './service/interceptors/http-interceptor.service';
import {ToastrModule} from 'ngx-toastr';
import {ErrorMessageInterceptor} from './service/interceptors/error-message.interceptor';
import { NavComponent } from './layout/nav/nav.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { HorizontalSpacingComponent } from './components/horizontal-spacing/horizontal-spacing.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {DatePipe} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import { IconCardComponent } from './components/icon-card/icon-card.component';
import { SuperviseComponent } from './intercom/supervise/supervise.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {TokenExpiredInterceptor} from "./service/interceptors/token-expired.interceptor";
import { CreateTimeEntryComponent } from './intercom/time-entry/create-time-entry/create-time-entry.component';
import { EditTimeEntryComponent } from './intercom/time-entry/edit-time-entry/edit-time-entry.component';
import { TimeEntryFormComponent } from './components/time-entry-form/time-entry-form.component';
import {TimeEntriesTableComponent} from "./components/time-entries-table/time-entries-table.component";
import { CategoriesComponent } from './intercom/supervise/categories/categories.component';
import { CreateCategoryComponent } from './intercom/supervise/categories/create-category/create-category.component';
import { EditCategoryComponent } from './intercom/supervise/categories/edit-category/edit-category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';


export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    HorizontalSpacingComponent,
    IconCardComponent,
    TimeEntriesTableComponent,
    SuperviseComponent,
    CreateTimeEntryComponent,
    EditTimeEntryComponent,
    TimeEntryFormComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FontAwesomeModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorMessageInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenExpiredInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
