import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ThemeOptions } from '../theme-options';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login-boxed',
  templateUrl: './login-boxed.component.html',
  styles: []
})
export class LoginBoxedComponent implements OnInit {
  year = new Date();
  user: FormGroup;
  postId: any;
  msg: string;
  showErr = false;
  data: any;
  constructor(public router: Router,
              public fb: FormBuilder,
              public globals: ThemeOptions,
              private http: HttpClient,
              private dataProvider: DataService) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  goTo(path) {
    this.router.navigate([path]);
  }
  get loginFormControl() {
    return this.user.controls;
  }
  validateUser() {
    this.http.post(this.dataProvider.login,
      {
        password: this.user.controls.password.value,
        email: this.user.controls.username.value
      })
      .subscribe(
        (val) => {
          this.data = val;
          localStorage.setItem('loginId', this.user.controls.username.value);
          localStorage.setItem('role', this.data.role);
          localStorage.setItem('id', this.data.id);
          if (this.data.role === 'admin') {
            this.goTo('home');
          } else {
            this.goTo('user');
          }
        },
        response => {
          this.msg = response.msg;
          this.showErr = true;
        });
  }
}

