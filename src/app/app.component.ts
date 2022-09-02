import { Component } from '@angular/core';
import ASN1 from '@lapo/asn1js';
import Hex from '@lapo/asn1js/hex';
import Base64 from '@lapo/asn1js/base64';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-certificate-app';
  isDropzoneVisible = false;
  certs: any[] = []
  selectedCertificate: any;

  constructor() {
    this.getListFromLocalStorage()
  }

  getListFromLocalStorage() {
    this.certs = JSON.parse(localStorage.getItem('certs'))
  }

  toggleDropezoneVisible() {
    this.isDropzoneVisible = !this.isDropzoneVisible
  }

  onCertSelected(data) {
    const asn1 = ASN1.decode(data.cert);

    const asn1Issuer = asn1.sub[0].sub[3];
    const asn1Person = asn1.sub[0].sub[5];
    const asn1Dates = asn1.sub[0].sub[4];

    const personName = asn1Issuer.sub[2].sub[0].sub[1].content()
    const issuerName = asn1Person.sub[2].sub[0].sub[1].content()
    const dateFrom = asn1Dates.sub[0].content()
    const dateTo = asn1Dates.sub[1].content()

    this.selectedCertificate = {
      personName,
      issuerName,
      dateFrom,
      dateTo
    }

    this.certs.forEach(item => {
      if (data.name === item.name) {
        item.selected = true
      } else {
        item.selected = false
      }
    });
  }
}
