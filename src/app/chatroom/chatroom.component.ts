import { Component, OnInit } from '@angular/core';
import { ChatroomService } from './chatroom.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {
  chatrooms: any[];
  messages: any[];
  message: string;

  constructor(private roomService: ChatroomService) { }

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
    const res = await this.roomService.getMessages().toPromise();
    console.log('res: ', res);
    this.messages = res;
  }

  async send(message = this.message) {
    const res = await this.roomService.createMessage({content: message}).toPromise();
    console.log('res: ', res);
  }

}
