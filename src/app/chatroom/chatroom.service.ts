import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { ApiBaseService } from '../shared/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  readonly url = 'chatrooms'
  readonly message_url = 'messages'
  constructor(
    private api: ApiBaseService,
    private _localStorageService: LocalStorageService
    ) { }

  getAll(): Observable<any> {
    return this.api.get(this.url);
  }

  getMessages(): Observable<any> {
    return this.api.get(`${this.message_url}`);
  }

  createMessage(body): Observable<any> {
    return this.api.post(`${this.message_url}`, {...body, username: this.username});
  }

  create(body): Observable<any> {
    return this.api.post(this.url, body);
  }

  get username() {
    const username = this._localStorageService.get('username');
    return username;
  }
}
