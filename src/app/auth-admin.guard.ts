import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLogged$()
      .pipe(map((logged:boolean) => {
          if(logged) {
            const currentUser = this.authService.currentUser!;

            if(currentUser) {
              if(currentUser!.constructor.name == 'Admin') {
                return true;
              }
            }

            return false;
          }
  
          this.router.navigate(['/auth/admin/login'], { queryParams: { returnUrl: state.url } });
          return false;
      }));
  }
  
}
