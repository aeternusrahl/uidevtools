import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import * as Clipboard from 'clipboard';

@Directive({
  selector: '[copyToClipboard]'
})
export class CopyToClipboardDirective implements OnInit, OnDestroy {

  clipboard: any;

  constructor(private element: ElementRef,
              private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.clipboard = new Clipboard(this.element.nativeElement);
    this.clipboard.on('success', () => {
      // when value is copied to the clipboard, add a style to play a css animation
      const el = this.element.nativeElement;
      this.renderer.addClass(el, 'clipboard-copied');
      const cancelListen = this.renderer.listen(el, 'animationend', () => {
        this.renderer.removeClass(el, 'clipboard-copied');
        cancelListen();
      });
    });
  }

  ngOnDestroy(): void {
    this.clipboard.destroy();
  }

}
