import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts/ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {

  year = new Date();
  constructor(public router: Router) { }
  ngOnInit() {
  }
  goTo(path) {
        this.router.navigate([path]);
  }
}
