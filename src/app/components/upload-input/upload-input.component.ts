
import { Component } from '@angular/core';


@Component({
  selector: 'upload-input',
  templateUrl: './upload-input.component.html',
  styleUrls: ['./upload-input.component.scss']
})
export class UploadInputComponent {

  allFiles: File[] = [];

  constructor() { }

  droppedFiles(allFiles: File[]): void {
    const filesAmount = allFiles.length;
    for (let i = 0; i < filesAmount; i++) {
      const file = allFiles[i];
      this.allFiles.push(file);
    }
  }
}
