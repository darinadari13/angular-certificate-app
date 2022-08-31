import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-certificate-app';
  isDropzoneVisible = false;

  toggleDropezoneVisible() {
    this.isDropzoneVisible = !this.isDropzoneVisible
  }
}
