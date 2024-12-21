import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appEnterKey]',
  standalone: true
})
export class EnterKeyDirective {
  @Output() messageSend = new EventEmitter<void>();
  @Output() lineBreak = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Shift + Enter for line break
        this.lineBreak.emit();
      } else {
        // Enter to send message
        event.preventDefault();
        setTimeout(()=> { // trick delay cho case enter
          this.messageSend.emit();
        }, 150);
      }
    }
  }
}
