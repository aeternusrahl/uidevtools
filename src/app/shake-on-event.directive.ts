import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[shakeOnEvent]'
})
export class ShakeOnEventDirective implements OnDestroy, OnChanges {

  @Input()
  eventSource: Observable<any>;

  subscription: Subscription;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) { }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const c = changes['eventSource'];
    // if event source has been changed
    if (c) {

      // if there was a previous value, unsubscribe
      this.unsubscribe();

      if (c.currentValue) {
        this.subscription = this.eventSource.subscribe(() => {
          this.shakeElement();
        });
      }
    }
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private shakeElement(): void {
    const el = this.elementRef.nativeElement;
    this.renderer.addClass(el, 'shake-element');
    const cancelListen = this.renderer.listen(el, 'animationend', () => {
      this.renderer.removeClass(el, 'shake-element');
      cancelListen();
    });
  }
}
