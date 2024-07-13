import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retryWhen, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = error.error.error_msg || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  private retryHandler(attempts: number = 3) {
    return (src: Observable<any>) =>
      src.pipe(
        retryWhen(errors => errors.pipe(
          tap(() => {
            if (--attempts < 1) throw new Error("Retry limit reached");
          })
        ))
      );
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(path, { params }).pipe(
      //this.retryHandler(),
      catchError(this.handleError)
    );
  }

  post(path: string, body: any, options = {}): Observable<any> {
    return this.httpClient.post(path, body, options).pipe(
      //this.retryHandler(),
      catchError(this.handleError)
    );
  }

  put(path: string, body: any, options = {}): Observable<any> {
    return this.httpClient.put(path, body, options).pipe(
      //this.retryHandler(),
      catchError(this.handleError)
    );
  }

  delete(path: string, options = {}): Observable<any> {
    return this.httpClient.delete(path, options).pipe(
      //this.retryHandler(),
      catchError(this.handleError)
    );
  }
}
