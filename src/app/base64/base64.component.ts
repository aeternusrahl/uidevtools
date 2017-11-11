import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-base64',
  templateUrl: './base64.component.html',
  styleUrls: ['./base64.component.scss']
})
export class Base64Component {

  private errorSubject = new Subject<any>();

  error$ = this.errorSubject.asObservable();
  text: string;
  enableTranscode = false;

  constructor() { }


  onTextChanged(value: string) {
    this.text = value;
    this.enableTranscode = (value.trim().length > 0);
  }

  encode(event: Event): void {
    try {
      const encodedText = btoa(encodeURIComponent(this.text).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      }));

      this.replaceText(encodedText);
    }
    catch (e) {
      this.errorSubject.next(e);
    }

    event.preventDefault();
  }


  decode(event: Event): void {
    try {
      const decodedText = decodeURIComponent(Array.prototype.map.call(atob(this.text), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      this.replaceText(decodedText);
    }
    catch (e) {
      this.errorSubject.next(e);
    }

    event.preventDefault();
  }

  private async replaceText(newText: string) {
    this.enableTranscode = false;

    await this.replaceTextWithAnimation(newText);

    this.enableTranscode = true;
  }

  private replaceTextWithAnimation(newText: string): Promise<void> {
    return new Promise<void>((resolve) => {

      // set up a timer to show a random string a few times
      // before setting the requested value.
      let iter = 0;
      const timer = setInterval(() => {
        if (++iter < 5) {
          this.text = this.getRandomString(newText.length);
        }
        else {
          this.text = newText;
          clearInterval(timer);
          resolve();
        }
      }, 25);
    });
  }

  private getRandomString(length: number): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\u0a00';
    let str = '';

    for (let i = 0; i < length ; i++) {
      str += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return str;
  }
}
