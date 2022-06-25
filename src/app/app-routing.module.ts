import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './layouts/auth/auth.component';
import { UserComponent } from './layouts/user/user.component';
import { CreateRestaurantComponent } from './pages/create-restaurant/create-restaurant.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';

const routes: Routes = [
  {
    'path': '',
    'component': UserComponent,
    'children': [
      {
        'path': '',
        'component': HomeComponent
      },
      {
        'path': 'restaurant',
        'component': RestaurantComponent,
        'canActivate': [AuthGuard]
      },
      {
        'path': 'restaurant/create',
        'component': CreateRestaurantComponent,
        'canActivate': [AuthAdminGuard]
      }
    ],
  }, 
  {
    'path': 'auth',
    'component': AuthComponent,
    'children': [
      {
        'path': 'login',
        'component': LoginComponent
      },
      {
        'path': 'admin/login',
        'component': LoginAdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
