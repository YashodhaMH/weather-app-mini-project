import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,HttpErrorResponse 
} from '@angular/common/http';
import {  Observable, retry } from 'rxjs';
import { catchError ,throwError} from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
    const reqParams =request.params;
    const params = reqParams.set('appid','d64d4cab622e7edf3c5288cbab73379e').set("units", 'metric');
    const dup =request.clone({params})
    return next.handle(dup).pipe(catchError(this.handleError)) 
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {  
      console.error('An error occurred:', error.error);
    }
    return throwError(() => new Error(error.error.message));
  }
}
