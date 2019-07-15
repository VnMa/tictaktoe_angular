import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String = '';

  constructor(private router: Router,
    private _localStorageService: LocalStorageService
    ) { }

  ngOnInit() {
    this.username = this._localStorageService.get<String>('username');
    
  }

  login() {
    this._localStorageService.set('username', this.username);
    console.log('username: ', this.username, this._localStorageService.get('username'));

    this.router.navigate(['/game']);
  }

}
