import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private element: ElementRef) {}
  @Output() public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.element.nativeElement.contains(target);
    const menuBtn = document.getElementById('menuBtn');
    if (!clickedInside) {
      this.clickOutside.emit(target);
    }
  }
}
