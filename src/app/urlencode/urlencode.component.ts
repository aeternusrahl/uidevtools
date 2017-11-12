import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AnimateTextUpdateService } from '../animate-text-update.service';
import 'rxjs/add/operator/finally';


@Component({
  templateUrl: './urlencode.component.html',
  styleUrls: ['./urlencode.component.scss']
})
export class URLEncodeComponent {

  private errorSubject = new Subject<any>();

  error$ = this.errorSubject.asObservable();
  text: string;
  enableTranscode = false;

  constructor(private textUpdate: AnimateTextUpdateService) { }


  onTextChanged(value: string) {
    this.text = value;
    this.enableTranscode = (value.trim().length > 0);
  }

  encode(event: Event): void {
    try {
      const encodedText = encodeURIComponent(this.text);

      this.replaceText(encodedText);
    }
    catch (e) {
      this.errorSubject.next(e);
    }

    event.preventDefault();
  }


  decode(event: Event): void {
    try {
      const decodedText = decodeURIComponent(this.text);

      this.replaceText(decodedText);
    }
    catch (e) {
      this.errorSubject.next(e);
    }

    event.preventDefault();
  }

  private replaceText(newText: string) {
    this.enableTranscode = false;

    this.textUpdate.updateToTextWithAnimation(newText)
      .finally(() => {
        this.enableTranscode = true;
      })
      .subscribe((text: string) => {
        this.text = text;
      });
  }
}
