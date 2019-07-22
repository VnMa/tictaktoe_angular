import { Injectable } from '@angular/core';
import * as ActionCable from 'actioncable';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable, BehaviorSubject } from 'rxjs';

// declare let App: any;

const CABLE_URL = 'ws://localhost:3000/cable';
@Injectable({
  providedIn: 'root'
})
export class CableService {
  App: any;
  cable: any;

  online$: Observable<string[]>;
  private onlineSubject: BehaviorSubject<string[]> = new BehaviorSubject([]);

  turn$: Observable<string>;
  private turnSubject: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private _localStorageService: LocalStorageService) {
    this.online$ = this.onlineSubject.asObservable();
    this.turn$ = this.turnSubject.asObservable();
    
    this.createConnection();

    const channel = 'chatroom';
    this.App[channel] = this.App.cable.subscriptions.create(
      { channel: 'ChatroomChannel'},
      {
        connected: () => {
          return this.install();
        },
        // Called when the WebSocket connection is closed
        disconnected: function() {
          return this.uninstall();
        },
        // Called when the subscription is rejected by the server
        rejected: function() {
          return this.uninstall();
        },
        uninstall: function() {
          console.log('uninstall: ', this);
        },
        received: (data: any) => {
          const { action } = data;
          console.log('received', data);
          switch(action) {
            default: {

            }
          }
        }
      }
    );

    const username = this.username;
    console.log('username: ', username);
    this.App[channel].setData({ username });
  }

  subscribeGameChannel() {

    this.App[`game`] = this.App.cable.subscriptions.create(
      { channel: 'GameChannel'},
      {
        connected: () => {
          return this.install();
        },
        // Called when the WebSocket connection is closed
        disconnected: function() {
          this.offline();
          return this.uninstall();
        },
        // Called when the subscription is rejected by the server
        rejected: function() {
          return this.uninstall();
        },
        uninstall: function() {
          this.offline();
          console.log('uninstall: ', this);
        },
        online: function() {
          console.log('online: ');
          return this.perform('online', { username: this.username });
        },
        offline: function() {
          console.log('offline: ');
          return this.perform('offline', { username: this.username });
        },
        setData: function({username}) {
          this.username = username;
        },
        received: (data: any) => {
          const { action, username, turn, observers } = data;
          console.log('received', data);
          switch(action) {
            case 'online': {
              const onlineList = Object.keys(observers);
              this.onlineSubject.next(onlineList);
            };
            break;
            case 'offline': {
              const onlineList = Object.keys(observers);
              this.onlineSubject.next(onlineList);
            }
            break;
            default: {

            }
          }
        }
      }
    );
  }
  createConnection() {
    if (!this.App || !this.App.game ) {
      this.App = {};
      this.App.cable = ActionCable.createConsumer(
        `${CABLE_URL}`
      );
      
    }
  }

  install() {
    console.log('installing ...', this.App);
    this.App['game'].online();
  }


  get username() {
    return this._localStorageService.get('username');
  } 

  cell_click(x, y) {

  }
}
