import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const DEFAULT_HEADERS = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  ACCEPT: 'application/json'
});
@Injectable()
export class GameService {
  readonly host = 'http://localhost:3000';
  readonly url = 'http://localhost:3000/games';

  private headers: HttpHeaders;
  private options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  };;

  constructor(private api: HttpClient) { 
    
  }

  getGame(): Observable<any> {
    this.buildOptions();
    return this.api.get(this.url, this.options);
  }

  cellClick(x, y): Observable<any> {
    this.buildOptions();
    return this.api.post(`${this.url}/cell_click`, JSON.stringify({x, y}), this.options);
  }

  updateGame(body): Observable<any> {
    this.buildOptions();
    return this.api.post(`${this.url}/update`, JSON.stringify(body), this.options);
  }

  resetGame(): Observable<any> {
    this.buildOptions();
    return this.api.post(`${this.url}/reset_game`, JSON.stringify({}), this.options);
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
