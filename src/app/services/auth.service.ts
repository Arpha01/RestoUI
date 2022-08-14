import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import { environment } from 'src/environments/environment';
import { handleError } from '../helpers/ErrorHandler';
import { Admin } from '../models/admin.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public currentUser: Admin|User|undefined;

  loginAdmin(email: string, password:string): Observable<any> {
    return this.http.get(`${environment.endpoint}/csrf-cookie`, {withCredentials: true, observe: 'response'}).pipe(
      switchMap (result => {
        return this.http.post<Admin>(`${environment.endpoint}/auth/admin/login`, { email, password }).pipe(
          catchError(handleError)
        );
      })
    )
  }

  loginUser(email: string, password:string): Observable<any> {
    return this.http.get(`${environment.endpoint}/csrf-cookie`, {withCredentials: true, observe: 'response'}).pipe(
      switchMap (result => {
        return this.http.post<User>(`${environment.endpoint}/auth/login`, { email, password }).pipe(
          catchError(handleError)
        );
      })
    )
  }

  isLogged$(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User|Admin> {
    return this.getCurrentUser();
  }

  getCurrentUser(): Observable<User|Admin> {
    if(this.currentUser) {
      return of(this.currentUser);
    } else {
      return this.http.get<User|Admin>(`${environment.endpoint}/user`)
      .pipe(tap(user => {
        const data:any = user;
        this.currentUser = data.type.includes('Admin') ? new Admin(<Admin> data.user) : new User(<User> data.user);
      }));
    }
  }

  logoutAdmin(): Observable<any> {
    return this.http.post(`${environment.endpoint}/auth/admin/logout`, '')
    .pipe(tap(() => this.doLogout()));
  }

  logoutUser(): Observable<any> {
    return this.http.post(`${environment.endpoint}/auth/logout`, '')
    .pipe(tap(() => this.doLogout()));
  }

  private doLogout(): void {
    this.currentUser = undefined;
  }

}
