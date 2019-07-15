import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';


@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    
    GameRoutingModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
