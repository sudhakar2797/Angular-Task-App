import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../../../theme-options';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  constructor(public globals: ThemeOptions, public router: Router) {
    if (localStorage.getItem('loginId') === null || localStorage.getItem('loginId') === undefined) {
      this.goTo('login');
    }
  }

  ngOnInit() {
  }
  goTo(path) {
    this.router.navigate([path]);
  }
  logout() {
    localStorage.clear();
    this.goTo('index');
  }
}
