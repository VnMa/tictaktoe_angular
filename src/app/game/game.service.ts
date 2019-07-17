import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiBaseService } from '../shared/api-base.service';

const DEFAULT_HEADERS = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  ACCEPT: 'application/json'
});
@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly url = 'games';
  constructor(private api: ApiBaseService) { 
    
  }

  getGame(): Observable<any> {
    return this.api.get(this.url);
  }

  cellClick(x, y): Observable<any> {
    return this.api.post(`${this.url}/cell_click`, {x,y});
  }

  updateGame(body): Observable<any> {
    return this.api.post(`${this.url}/update`, body);
  }

  resetGame(): Observable<any> {
    return this.api.post(`${this.url}/reset_game`, {});
  }


}
