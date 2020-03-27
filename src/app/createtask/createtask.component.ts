import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../theme-options';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styles: []
})
export class CreatetaskComponent implements OnInit {
  heading = 'Create Task';
  subheading = 'Here you can create new task for your employees';
  icon = 'fa fa-plus icon-gradient bg-malibu-beach';
  createTask: FormGroup;
  user: any;
  msg: any;
  showErr: boolean;
  duration = [];
  loginId: string;
  constructor(public router: Router,
              public fb: FormBuilder,
              public globals: ThemeOptions,
              private http: HttpClient,
              private dataProvider: DataService) {
    this.duration = this.dataProvider.taskDuration;
    this.loginId = localStorage.getItem('loginId');
  }
  ngOnInit() {
    this.createTask = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      taskDescription: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      taskDuration: ['', [Validators.required]],
    });
  }
  goTo(path) {
    this.router.navigate([path]);
  }
  get createTaskFormControl() {
    return this.createTask.controls;
  }
  addNewTask() {
    this.http.post(this.dataProvider.taskDetails,
      {
        task_name: this.createTaskFormControl.taskName.value,
        task_description: this.createTaskFormControl.taskDescription.value,
        created_by: this.loginId,
        assigned_to: '',
        task_duration: this.createTaskFormControl.taskDuration.value + ' hr',
        task_status: 'unassigned'
      })
      .subscribe(
        (val) => {
          this.showErr = true;
          this.msg = 'Task Added successfully';
          this.createTask.reset();
        },
        response => {
          this.msg = 'Enter valid data';
          this.showErr = true;
        });
  }

}
