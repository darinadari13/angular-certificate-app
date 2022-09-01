import { Component } from '@angular/core';

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.scss']
})
export class CertificateListComponent {
  certs

  constructor() {
    this.certs = JSON.parse(localStorage.getItem('certs'))
  }
}