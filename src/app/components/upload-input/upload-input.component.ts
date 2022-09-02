
import { Component, EventEmitter, Input, Output } from '@angular/core';
import ASN1 from '@lapo/asn1js';
import Hex from '@lapo/asn1js/hex';
import Base64 from '@lapo/asn1js/base64';

const reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/

function decodeBinaryString(str) {
  var der;

  if (reHex.test(str))
    der = Hex.decode(str);
  else if (Base64.re.test(str))
    der = Base64.unarmor(str);
  else
    der = str;

  return der
}

function readFile(f) {
    return new Promise((resolve, reject) => {
      var r = new FileReader();
      r.onloadend = function () {
        resolve(decodeBinaryString(r.result));
      };
      r.readAsBinaryString(f);
    })
}

@Component({
  selector: 'upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss']
})
export class UploadInputComponent {
  @Input() onFileUploadCompleted;

  droppedFiles(file: File): void {
    readFile(file).then((decodedFile) => {
        const asn1 = ASN1.decode(decodedFile);

        const asn1Issuer = asn1.sub[0].sub[3];
        // const asn1Person = asn1.sub[0].sub[5];
        // const asn1Dates = asn1.sub[0].sub[4];

        const personName = asn1Issuer.sub[2].sub[0].sub[1].content()
        // const issuerName = asn1Person.sub[2].sub[0].sub[1].content()
        // const dateFrom = asn1Dates.sub[0].content()
        // const dateTo = asn1Dates.sub[1].content()

        const currentSavedCerts = JSON.parse(localStorage.getItem('certs')) || []
        localStorage.setItem('certs', JSON.stringify([...currentSavedCerts, { cert: decodedFile, name: personName }]))

        this.onFileUploadCompleted()
      })
  }
}
