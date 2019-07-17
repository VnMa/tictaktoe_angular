import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomComponent } from './chatroom.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



const routes: Routes = [{
  path: 'chatroom',
  component: ChatroomComponent
}];

@NgModule({
  declarations: [ChatroomComponent],
  imports: [
    CommonModule,
    FormsModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    CommonModule,
    FormsModule,
    
    RouterModule]
})
export class ChatroomModule { }
