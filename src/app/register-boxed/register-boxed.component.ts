import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register-boxed',
  templateUrl: './register-boxed.component.html',
  styles: []
})
export class RegisterBoxedComponent implements OnInit {
  year = new Date();
  register: FormGroup;
  mismatch = false;
  showErr = false;
  msg = '';
  constructor(public router: Router, private fb: FormBuilder, private http: HttpClient, private dataProvider: DataService) { }

  ngOnInit() {
    this.register = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmpsw: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
  }
  confirmPassword() {
    if (this.registerFormControl.password.value !== this.registerFormControl.confirmpsw.value) {
      this.mismatch = true;
      this.registerFormControl.confirmpsw.setErrors({ incorrect: true });
    } else {
      this.mismatch = false;
    }
  }
  get registerFormControl() {
    return this.register.controls;
  }
  goTo(path) {
    this.router.navigate([path]);
  }
  registerUser() {
    this.http.post(this.dataProvider.user,
      {
        name: this.registerFormControl.username.value,
        password: this.registerFormControl.password.value,
        email: this.registerFormControl.email.value
      })
      .subscribe(
        (val) => {
          this.msg = 'Please login username ' +
            this.registerFormControl.email.value + ' you will be redirect to login page after 5 seconds';
          this.showErr = true;
          this.register.reset();
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 5000);
        },
        response => {
          this.msg = response.error.email;
          this.showErr = true;
        });
  }
}
