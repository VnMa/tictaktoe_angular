import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const DEFAULT_HEADERS = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  ACCEPT: 'application/json'
});

const host = 'http://localhost';
const port = 3000;
@Injectable({
  providedIn: 'root'
})
export class ApiBaseService {


  private headers: HttpHeaders;
  private options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };;

  constructor(private http: HttpClient) { 
    
  }

  get(url): Observable<any> {
    this.buildOptions();
    return this.http.get(`${host}:${port}/${url}`, this.options);
  }

  post(url, body = {}): Observable<any> {
    this.buildOptions();
    return this.http.post(`${host}:${port}/${url}`, body, this.options);
  }

  private buildOptions(options: any = {}) {
    // Json web token
    this.options = {
      headers: DEFAULT_HEADERS
    };
    if (options.responseType) {
      this.options.responseType = options.responseType;
    } else {
      this.options.responseType = 'json';
    }
  }

  protected handleError(error: any | any): any {
    return throwError(error);
  }

}
