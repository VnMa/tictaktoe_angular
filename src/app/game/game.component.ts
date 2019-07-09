import { Component, OnInit } from '@angular/core';
import { log } from 'util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  user_1 = 'Albert';
  user_2 = 'David';
  next_turn: string;
  next_icon = 'x';
  board = [];
  size = 3;

  constructor() { }

  ngOnInit() {
    this.next_turn = this.user_1;

    this.loadData();
    console.log(this.board);
  }

  // TODO: Load data from api instead
  loadData() {
    this.board = this.generateBoard(this.size);
  }

  rowClick(i, j) {
    console.log('Click cell at: ', i, j);
    if (!!this.board[i][j]) {
      console.log('cell exists at ', i, j);
    } else {
      this.board[i][j] = this.next_icon;
      this.switchIcon();
    }
  }

  generateBoard(size): Array<any> {
    // const row = new Array(size);
    const row =Array.from(new Array(size),(_)=> '');
    return Array.from(new Array(size), (_) => row.slice());
  }

  switchIcon() {
    this.next_icon = (this.next_icon === 'x') ? 'o' : 'x';
  }
}
