import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeOptions } from '../theme-options';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styles: []
})
export class UserprofileComponent implements OnInit {
  heading = 'User Profile';
  subheading = 'Here you can View your profile Details';
  icon = 'fa fa-users icon-gradient bg-sunny-morning';
  data: any;
  role: string;
  constructor(public globals: ThemeOptions, private http: HttpClient, private dataProvider: DataService) { }
  ngOnInit() {
    const id = localStorage.getItem('id');
    const url = this.dataProvider.user + id + '/';
    this.http.get(url)
      .subscribe(
        (val) => {
          this.data = val;
          this.role = localStorage.getItem('role');
        });
  }
}
