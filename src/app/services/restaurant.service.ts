import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { environment } from 'src/environments/environment';
import { handleError } from '../helpers/ErrorHandler';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private http: HttpClient) { 
    
  }

  findAll(data?: any, name?: string): Observable<any> {
    if(name) {
      const searchParam = { name: name }; 

      Object.assign(data, searchParam);
    } else {
      if(data && data.hasOwnProperty('name')) {
        delete data.name;
      }
    }
    return this.http.get(`${environment.endpoint}/restaurants`, { params: data }).pipe(
      catchError(handleError)
    )
  }

  store(restaurant: any): Observable<any> {
    return this.http.post<Restaurant>(`${environment.endpoint}/restaurants`, restaurant).pipe(
      catchError(handleError)
    );
  }
}
