import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[DropZone]'
})
export class DropzoneDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.opacity') private opacity = '1';
  @HostBinding('style.border') private border = 'none';

  @HostListener('drop', ['$event']) public ondrop(evt): any {
    evt.preventDefault();
    evt.stopPropagation();

    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      console.log(`You dropped ${files.length} files.`, files)
    }
  }
}
