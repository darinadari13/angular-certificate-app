import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.scss']
})
export class CertificateListComponent {
  @Input() certs = [];
  @Output() certSelected = new EventEmitter<any>();

  selectCert(cert) {
    this.certSelected.emit(cert);
  }
}