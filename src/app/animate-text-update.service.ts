
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { concatMap } from 'rxjs/operators';
import 'rxjs/add/operator/delay';

@Injectable()
export class AnimateTextUpdateService {

  /**
   * Return an observable that will emit random text to be displayed as an
   * "animation" at regular intervals, ending with the specified text.
   * @param {string} newText
   * @returns {Observable<string>}
   */
  updateToTextWithAnimation(newText: string): Observable<string> {
    const randomStrings: string[] = [];
    const textLength = newText.length;

    for (let i = 0; i < 5; i++) {
      randomStrings.push(this.getRandomString(textLength));
    }
    randomStrings.push(newText);

    return ArrayObservable.create(randomStrings)
      .pipe(concatMap((t) => {
        return ArrayObservable.of(t).delay(25);
      }));
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
