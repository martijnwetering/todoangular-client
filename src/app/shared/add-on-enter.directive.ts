import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAddOnEnter]'
})
export class AddOnEnterDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keyup', ['$event']) onkeyup($event) {
    const ENTER_KEY = 13;
    if ($event.keyCode === ENTER_KEY) {
      const button = this.el.nativeElement.parentNode.querySelector('button');
      if (button) {
        button.click();
      }
    }
  }

}
