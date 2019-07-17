import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { LocalStorageModule } from 'angular-2-local-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { LoginModule } from './login/login.module';
import { ChatroomModule } from './chatroom/chatroom.module';
@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    LocalStorageModule.forRoot({
      prefix: 'my-app',
      storageType: 'localStorage'
  }),

    // Custom modules
    GameModule,
    ChatroomModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
