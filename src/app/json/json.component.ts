import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AnimateTextUpdateService } from '../animate-text-update.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {

  @ViewChild('jsonText', {read: ElementRef})
  jsonTextElement: ElementRef;

  private errorSubject = new Subject<any>();
  error$ = this.errorSubject.asObservable();
  text: string;
  indentSpaces = 2;
  enableFormat = false;

  constructor() { }

  ngOnInit() {
  }

  onTextChanged(value: string) {
    this.text = value;
    this.enableFormat = (value.trim().length > 0);
  }


  reformat(event: Event): void {
    event.preventDefault();

    try {
      const o = JSON.parse(this.text);
      this.replaceText(JSON.stringify(o, null, this.indentSpaces));
    }
    catch (e) {
      // emit the error so the view can listen for it
      this.errorSubject.next(e);
    }
  }

  private replaceText(newText: string) {
    this.text = newText;
    this.jsonTextElement.nativeElement.style.height = 'inherit';
    setTimeout(() => {
      this.jsonTextElement.nativeElement.style.height = this.jsonTextElement.nativeElement.scrollHeight + 2 + 'px';
    }, 0);

  }
}
