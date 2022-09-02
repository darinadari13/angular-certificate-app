import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-certificate-app';
  isDropzoneVisible = false;
  certs: any[]

  constructor() {
    this.getListFromLocalStorage()
  }

  getListFromLocalStorage() {
    this.certs = JSON.parse(localStorage.getItem('certs'))
  }

  toggleDropezoneVisible() {
    this.isDropzoneVisible = !this.isDropzoneVisible
  }
}
