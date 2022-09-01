import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
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
@Directive({
  selector: '[DropZone]'
})
export class DropzoneDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) public onDragOver(evt): any {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt): any {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', ['$event']) public ondrop(evt): any {
    evt.preventDefault();
    evt.stopPropagation();

    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      readFile(files[0]).then((decodedFile) => {
          const asn1 = ASN1.decode(decodedFile);

          const asn1Issuer = asn1.sub[0].sub[3];
          const asn1Person = asn1.sub[0].sub[5];
          const asn1Dates = asn1.sub[0].sub[4];

          const personName = asn1Issuer.sub[2].sub[0].sub[1].content()
          const issuerName = asn1Person.sub[2].sub[0].sub[1].content()
          const dateFrom = asn1Dates.sub[0].content()
          const dateTo = asn1Dates.sub[1].content()

          const currentSavedCerts = JSON.parse(localStorage.getItem('certs')) || []
          localStorage.setItem('certs', JSON.stringify([...currentSavedCerts, { cert: decodedFile, name: personName }]))
      })
    }
  }
}


// TODO:
// 1. Select cert -> parce set -> display info in info cert component. Read about components communication
// in Angular
// 2. Rerender left list after saving new cert to localstorage
// 3. Upload to stackblitz
