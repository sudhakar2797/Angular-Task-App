import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { ThemeOptions } from './theme-options';
import { ConfigActions } from './ThemeOptions/store/config.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'Task Manager';
  logId = false;
  constructor(public globals: ThemeOptions, public configActions: ConfigActions) {
    this.logId = globals.login;
  }

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }
}
