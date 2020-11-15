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
import { SimpleFormComponent } from './components/simple-form/simple-form.component';
import { HorizontalSpacingComponent } from './components/horizontal-spacing/horizontal-spacing.component';
import { SimpleTableComponent } from './components/simple-table/simple-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {DatePipe} from '@angular/common';


export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavComponent,
    SimpleFormComponent,
    HorizontalSpacingComponent,
    SimpleTableComponent,
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
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
