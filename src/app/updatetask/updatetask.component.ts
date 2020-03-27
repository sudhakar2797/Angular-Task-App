import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../theme-options';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-updatetask',
  templateUrl: './updatetask.component.html',
  styles: []
})
export class UpdatetaskComponent implements OnInit {
  heading = 'Update Task';
  subheading = 'Here you can Update your task details';
  icon = 'fa fa-edit icon-gradient bg-sunny-morning';
  showErr: boolean;
  msg: string;
  ids = [];
  name = [];
  data: any;
  datas: any;
  main = false;
  updateTask: FormGroup;
  duration: number[];
  loginId: string;
  status: string[];
  taskId: any;
  constructor(public globals: ThemeOptions, private http: HttpClient, private fb: FormBuilder, private dataProvider: DataService) {
    this.status = this.dataProvider.taskStatus;
    this.duration = this.dataProvider.taskDuration;
    this.loginId = localStorage.getItem('loginId');
  }

  ngOnInit() {
    this.http.get(this.dataProvider.taskDetails)
      .subscribe(
        (res) => {
          this.data = res;
          this.data.forEach(item => {
            this.ids.push(item.task_id);
          });
        }
      );
    this.updateTask = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      taskDescription: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
      taskDuration: ['', [Validators.required]],
      assignedTo: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]]
    });
  }
  searchData(id) {
    this.taskId = id;
    this.main = true;
    const url = this.dataProvider.taskDetails + id + '/';
    this.http.get(url)
      .subscribe(
        (val) => {
          this.datas = val;
          this.updateTaskFormControl.taskName.setValue(this.datas.task_name);
          this.updateTaskFormControl.taskDescription.setValue(this.datas.task_description);
          this.updateTaskFormControl.assignedTo.setValue(this.datas.assigned_to);
          this.updateTaskFormControl.taskDuration.setValue((this.datas.task_duration).toString().replace(' hr', ''));
          this.updateTaskFormControl.taskStatus.setValue(this.datas.task_status);
        });
    this.http.get(this.dataProvider.user)
      .subscribe(
        (val) => {
          this.datas = val;
          this.datas.forEach(item => {
            this.name.push(item.email);
          });
        });
  }
  updateData() {
    this.http.patch(this.dataProvider.taskDetails + this.taskId + '/',
      {
        task_name: this.updateTaskFormControl.taskName.value,
        task_description: this.updateTaskFormControl.taskDescription.value,
        created_by: this.loginId,
        assigned_to: this.updateTaskFormControl.assignedTo.value,
        task_duration: this.updateTaskFormControl.taskDuration.value + ' hr',
        task_status: this.updateTaskFormControl.taskStatus.value
      })
      .subscribe(
        (val) => {
          this.showErr = true;
          this.msg = 'Task Updated successfully';
          this.main = false;
          this.updateTask.reset();
        },
        response => {
          this.msg = 'Enter valid data';
          this.showErr = true;
        });
  }
  get updateTaskFormControl() {
    return this.updateTask.controls;
  }
}
