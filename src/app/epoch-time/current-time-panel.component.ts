import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'current-time-panel',
  templateUrl: './current-time-panel.component.html',
  styleUrls: ['./current-time-panel.component.scss']
})
export class CurrentTimePanelComponent implements OnInit {

  @ViewChild('refreshButton', {read: ElementRef})
  refreshButtonElement: ElementRef;

  seconds: number;
  milliseconds: number;
  isoTime: string;
  localTime: string;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.refreshTime();
  }


  onClickRefresh(event: Event): void {
    this.refreshTime();
    this.animateRefreshIcon();
    event.preventDefault();
  }

  private refreshTime(): void {
    const m = moment();
    this.seconds = m.unix();
    this.milliseconds = m.valueOf();
    this.isoTime = m.toISOString();
    this.localTime = m.format('DD-MMM-YYYY HH:mm:ss.SSS');
  }


  private animateRefreshIcon(): void {
    const el = this.refreshButtonElement.nativeElement;
    this.renderer.addClass(el, 'time-refreshed');
    const cancelListen = this.renderer.listen(el, 'animationend', () => {
      this.renderer.removeClass(el, 'time-refreshed');
      cancelListen();
    });
  }

}
