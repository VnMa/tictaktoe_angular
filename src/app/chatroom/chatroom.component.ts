import { Component, OnInit } from '@angular/core';
import { ChatroomService } from './chatroom.service';
import { ChatroomChannelService } from './chatroom-channel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  chatrooms: any[];
  message: string;
  messages$: Observable<any[]>;

  constructor(private roomService: ChatroomService,
      private chatChannel: ChatroomChannelService
    ) { 
      this.messages$ = this.roomService.messages$;
    }

  ngOnInit() {
    (async() => {
      await this.loadChatrooms();
      await this.loadChatMessages();
    }) ();
  }

  async loadChatrooms() {
    const res = await this.roomService.getAll().toPromise();
    console.log('res: ', res);
    this.chatrooms = res;
  }

  async loadChatMessages() {
    return await this.roomService.getMessages();
  }

  async send(message = this.message) {
    return await this.roomService.createMessage({content: message});
  }

}
