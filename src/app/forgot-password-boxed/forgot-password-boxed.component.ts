import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-boxed',
  templateUrl: './forgot-password-boxed.component.html',
  styles: []
})
export class ForgotPasswordBoxedComponent implements OnInit {
  year = new Date();
  constructor(public router: Router) { }

  ngOnInit() {
  }
  goTo(path) {
    this.router.navigate([path]);
  }
}
