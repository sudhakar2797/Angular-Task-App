import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../theme-options';
import { HttpClient } from '@angular/common/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-assigntask',
  templateUrl: './assigntask.component.html',
  styles: []
})
export class AssigntaskComponent implements OnInit {
  heading = 'Assign Task';
  subheading = 'Here you can assign new task to your employees';
  icon = 'fa fa-users icon-gradient bg-happy-fisher';
  datas: any;
  name = [];
  task = [];
  assignTask: FormGroup;
  showErr = false;
  msg: string;
  constructor(public globals: ThemeOptions, private http: HttpClient, private fb: FormBuilder, private dataProvider: DataService) { }
  ngOnInit() {
    this.assignTask = this.fb.group({
      task: ['', [Validators.required]],
      assignedTo: ['', [Validators.required]],
    });
    this.refreshTask();
  }
  get assignTaskFormControl() {
    return this.assignTask.controls;
  }
  refreshTask() {
    this.name = [];
    this.task = [];
    this.http.get(this.dataProvider.user)
      .subscribe(
        (val) => {
          this.datas = val;
          this.datas.forEach(item => {
            this.name.push(item.email);
          });
        });
    this.http.get(this.dataProvider.taskDetails)
      .subscribe(
        (res) => {
          this.datas = res;
          this.datas.forEach(item => {
            if (item.task_status === 'unassigned') {
              this.task.push(item.task_id);
            }
          });
        });
  }
  updateData() {
    const id = this.assignTaskFormControl.task.value;
    const url = this.dataProvider.taskDetails + id + '/';
    this.http.get(url)
      .subscribe(
        (val) => {
          this.datas = val;
          this.http.patch(this.dataProvider.taskDetails + id + '/',
            {
              task_name: this.datas.task_name,
              task_description: this.datas.task_description,
              created_by: this.datas.created_by,
              assigned_to: this.assignTaskFormControl.assignedTo.value,
              task_duration: this.datas.task_duration,
              task_status: 'assigned'
            })
            .subscribe(
              () => {
                this.showErr = true;
                this.msg = 'Task Assigned successfully';
                this.assignTask.reset();
                this.refreshTask();
              },
              response => {
                this.msg = 'Enter valid data';
                this.showErr = true;
              });
        });
  }
}
