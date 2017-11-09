import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';


function filterInt(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  }
  return NaN;
}


type PanelState = 'empty' | 'invalid' | 'show-epoch' | 'show-datetime';


@Component({
  selector: 'conver-time-panel',
  templateUrl: './convert-time-panel.component.html',
  styleUrls: ['./convert-time-panel.component.scss']
})
export class ConvertTimePanelComponent implements OnInit {

  rawInput: string;
  panelState: PanelState = 'empty';
  epochSeconds: number;
  isoTime: string;
  localDateTime: string;

  constructor() {
  }

  ngOnInit() {
  }

  onInputChanged(value: string) {
    let m: Moment;
    this.rawInput = value;

    this.epochSeconds = undefined;

    // if no data is entered, reset the form
    if (!value || value === '') {
      this.panelState = 'empty';
      return;
    }


    // if user entered an integer value, assume it is epoch seconds
    const num = filterInt(value);
    if (!Number.isNaN(num)) {
      m = moment.unix(num);
      if (m.isValid()) {
        // user entered epoch seconds, show date time
        this.panelState = 'show-datetime';
        this.isoTime = m.toISOString();
        this.localDateTime = m.format('DD-MMM-YYYY HH:mm:ss.SSS');
      }
    }
    // otherwise try to parse it as a string-form date and time
    else {
      m = moment(value);
      if (m.isValid()) {
        // user entered date/time, show epoch seconds
        this.panelState = 'show-epoch';
        this.epochSeconds = m.unix();
      }
    }

    // if we got here and it's invalid, then we know it didn't satisfy either
    // of the conditions above
    if (!m.isValid()) {
      this.panelState = 'invalid';
    }

  }

}
