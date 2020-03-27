import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  year = new Date();
  constructor(private router: Router) { }

  ngOnInit() { }
  goTo() {
    if (localStorage.getItem('role') === 'admin') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['user']);
    }
  }
}
