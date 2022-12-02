import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[fmlHighlightRow]',
})
export class HighlightRowDirective implements OnChanges {
  @Input() chosen = false;

  constructor(private el: ElementRef) {
    this.standEasy();
  }

  @HostListener('mouseover') onMouseEnter() {
    this.highlight();
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.chosen) this.standEasy();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chosen']) {
      if (this.chosen) this.highlight();
      else this.standEasy();
    }
  }

  private standEasy() {
    this.el.nativeElement.style.border = '5px solid #242b31';
    this.el.nativeElement.style.color = '#fcede7';
    this.el.nativeElement.style.backgroundColor = '#242b31';
  }

  private highlight() {
    this.el.nativeElement.style.border = '5px solid #242b31';
    this.el.nativeElement.style.color = '#db6637';
    this.el.nativeElement.style.backgroundColor = '#fcede7';
  }
}
