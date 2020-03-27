import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  loginUser: string;
  taskDuration = [1, 2, 3, 4, 5];
  taskStatus = ['assigned', 'unassigned', 'completed'];
  data: any;
  taskDetails = 'http://127.0.0.1:8000/api/taskdetails/';
  user = 'http://127.0.0.1:8000/api/welcome-modelviewset/';
  login = 'http://127.0.0.1:8000/api/login/';
  constructor() { }
}
