import { Injectable } from '@angular/core';
import * as ActionCable from 'actioncable';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChatroomService } from './chatroom.service';

// declare let App: any;

const CABLE_URL = 'ws://localhost:3000/cable';
@Injectable({
  providedIn: 'root'
})
export class ChatroomChannelService {
  App: any;
  cable: any;

  constructor(private _localStorageService: LocalStorageService,
      private chatroomService: ChatroomService
    ) {    
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
          const { action, message } = data;
          console.log('received', data);
          switch(action) {
            case 'message_created': {
              this.chatroomService.appendMessage(message);
            }
            break;
            default: {
              console.log('unhandle action tyep: ', action);
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
  }


  get username() {
    return this._localStorageService.get('username');
  } 
}
