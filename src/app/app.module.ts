import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { UserComponent } from './layouts/user/user.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { WebnavbarComponent } from './components/webnavbar/webnavbar.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { WebfooterComponent } from './components/webfooter/webfooter.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HttpXsrfInterceptor } from './http-xsrf.interceptor';
import { HttpCredentialsInterceptor } from './http-credentials.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { CreateRestaurantComponent } from './pages/create-restaurant/create-restaurant.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AuthComponent,
    WebnavbarComponent,
    RestaurantComponent,
    WebfooterComponent,
    LoginComponent,
    HomeComponent,
    CreateRestaurantComponent,
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXsrfInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCredentialsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
