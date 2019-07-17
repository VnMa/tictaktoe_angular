import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from './game.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { CableService } from '../cable.service';
import { Observable } from 'rxjs';


declare const $: any;
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
  status: string;
  game_end = false;
  observers: String[] = [];
  online$: Observable<string[]>;
  turn$: Observable<string>;

  constructor(private gameService: GameService,
    private router: Router,
    private cableService: CableService,
    private _localStorageService: LocalStorageService) { 
      this.online$ = this.cableService.online$;
      this.turn$ = this.cableService.turn$;
    }

  ngOnInit() {
    this.next_turn = this.user_1;
    this.status = `Next player: ${this.next_turn} ( ${this.next_icon} )` ;

    (async() => {
      await this.promptUserName();
      await this.loadData();
      this.showGameInfo();
      console.log(this.board);
    })();
    
  }

  logout() {
    console.log('Perform logout ...');
    this._localStorageService.remove('username');
    this.router.navigate(['/']);
  }

  async promptUserName() {
    const username = this._localStorageService.get<string>('username');
    if (!username) {
      return await this.router.navigate(['/']);
    }
  }

  // TODO: Load data from api instead
  async loadData() {
    // this.board = this.generateBoard(this.size);
    const game = await this.gameService.getGame().toPromise();
    console.log('game: ', game);
    // this.user_1 = game['user_1'];
    // this.user_2 = game['user_2'];
    this.next_turn = game['turn'];
    this.next_icon = game['icon'];
    this.board = game['board'];

    // this.resetBoard();

    // Set username
    const username = this._localStorageService.get<string>('username');
    console.log('username: ', username);
    
    // TODO: Detect and remove inactive user
    this.observers.push(username);
    if (!this.user_1) {
      this.user_1 = username;
    } else if (!this.user_2) {
      this.user_2 = username;
    }
  }

  showGameInfo() {
    $('#gameInfo').modal();
  }

  async createNewGame() {
    console.log('Create new game ...');
    // this.resetBoard();
    const game = await this.gameService.updateGame({
      user_1: this.user_1,
      user_2: this.user_2,
      turn: this.next_turn,
      icon: this.next_icon,
      size: this.size
    }).toPromise();

    this.board = game['board'];

    $.modal.close();
  }
  rowClick(i, j) {
    console.log('Click cell at: ', i, j);
    if (!!this.board[i][j]) {
      console.log('cell exists at ', i, j);
    } else {
      this.board[i][j] = this.next_icon;
      const winner = this.detectWinner(this.board);
      this.next_icon = (this.next_icon === 'x') ? 'o' : 'x';
      this.next_turn = (this.next_turn === this.user_1) ? this.user_2 : this.user_1;

      if (winner) {
        this.status = 'Winner: ' + winner;
        this.showGameInfo();
      } else {
        this.status = `Next player: ${this.next_turn} ( ${this.next_icon} )` ;
      }
    }
  }

  resetBoard() {
    this.next_turn = this.user_1;
    this.next_icon = 'o';
    this.board = this.generateBoard(this.size);
  }

  generateBoard(size): Array<any> {
    // const row = new Array(size);
    const row =Array.from(new Array(size),(_)=> '');
    return Array.from(new Array(size), (_) => row.slice());
  }

  detectWinner(board: Array<any>) {
    const lines = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,2]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [[a0, a1], [b0, b1], [c0, c1]] = lines[i];
      if (board[a0][a1] && board[a0][a1] === board[b0][b1] && board[a0][a1] === board[c0][c1]) {
        return board[a0][a1];
      }
    }
    return null;
  }
}
