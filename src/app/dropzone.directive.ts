import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

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
      this.onFileDropped.emit(files[0]);
    }
  }
}


// TODO:
// 1. Select cert -> parce set -> display info in info cert component. Read about components communication
// in Angular
// 2. Rerender left list after saving new cert to localstorage
// 3. Upload to stackblitz
