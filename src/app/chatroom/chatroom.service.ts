import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { ApiBaseService } from '../shared/api-base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  readonly url = 'chatrooms'
  readonly message_url = 'messages'

  // TODO: Move following variables into separate data storage
  messages$: Observable<any[]>;
  private messagesSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(
    private api: ApiBaseService,
    private _localStorageService: LocalStorageService
    ) { 
      this.messages$ = this.messagesSubject.asObservable();

    }

  getAll(): Observable<any> {
    return this.api.get(this.url);
  }

  async getMessages() {
    const res = await this.api.get(`${this.message_url}`).toPromise();
    console.log('res: ', res);
    this.messagesSubject.next(res);
  }

  async createMessage(body) {
    return await this.api.post(`${this.message_url}`, {...body, username: this.username}).toPromise();
  }

  create(body): Observable<any> {
    return this.api.post(this.url, body);
  }

  get username() {
    const username = this._localStorageService.get('username');
    return username;
  }

  appendMessage(message) {
    const messages = this.messagesSubject.getValue().concat([message]);
    this.messagesSubject.next(messages);
  }
}
