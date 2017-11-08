import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'current-time-panel',
  templateUrl: './current-time-panel.component.html',
  styleUrls: ['./current-time-panel.component.scss']
})
export class CurrentTimePanelComponent implements OnInit {

  seconds: number;
  milliseconds: number;
  isoTime: string;
  localTime: string;

  constructor() {
  }

  ngOnInit() {
    this.refreshTime();
  }


  private refreshTime(): void {
    const m = moment();
    this.seconds = m.unix();
    this.milliseconds = m.valueOf();
    this.isoTime = m.toISOString();
    this.localTime = m.format('DD-MMM-YYYY HH:mm:ss.SSS');
  }

}
