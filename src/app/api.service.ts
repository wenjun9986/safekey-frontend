import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {from, Observable, switchMap, throwError} from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  private getHeaders(includeToken: boolean = true) {
    if (!includeToken) {
      return from (Promise.resolve(new HttpHeaders()))
    }
    return from (new Promise<HttpHeaders>((resolve) => {
      chrome.storage.local.get(['JWTToken'], (result) => {
        let headers = new HttpHeaders();
        if (result['JWTToken']) {
          headers = headers.append('Authorization', `Bearer ${result['JWTToken']}`);
        }
        resolve(headers);
      });
    }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error(`Client Error: ${error.error.message}`));
    } else {
      const errorMessage = error.error.message || `Server Error Code: ${error.status}, Message: ${error.message}`;
      return throwError(() => new Error(errorMessage));
    }
  }

  /*private retryHandler(attempts: number = 3) {
    return (src: Observable<any>) =>
      src.pipe(
        retryWhen(errors => errors.pipe(
          tap(() => {
            if (--attempts < 1) throw new Error("Retry limit reached");
          })
        ))
      );
  }*/

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(path, { params }).pipe(
      catchError(this.handleError)
    );
  }

  post(path: string, body: any, options = {}): Observable<any> {
    return this.httpClient.post(path, body , options).pipe(
      catchError(this.handleError)
    );
  }

  put(path: string, body: any): Observable<any> {
    return this.httpClient.put(path, body).pipe(
      catchError(this.handleError)
    );
  }

  delete(path: string, options = {}): Observable<any> {
    return this.httpClient.delete(path, options).pipe(
      catchError(this.handleError)
    );
  }
}
