import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  headerName = 'X-XSRF-TOKEN';

  constructor(private tokenService: HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request.headers.set('withCredentials', 'true');

    if(request.method === 'GET' || request.method === 'HEAD') {
      return next.handle(request);
    }

    const token = this.tokenService.getToken();

    if(token !== null && !request.headers.has(this.headerName)) {
      request = request.clone({headers: request.headers.set(this.headerName, token)});
    }

    return next.handle(request);
  }
}
