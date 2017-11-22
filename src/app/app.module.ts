import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './routes';
import { EpochTimeComponent } from './epoch-time/epoch-time.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { CurrentTimePanelComponent } from './epoch-time/current-time-panel.component';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';
import { ConvertTimePanelComponent } from './epoch-time/convert-time-panel.component';
import { FormsModule } from '@angular/forms';
import { Base64Component } from './base64/base64.component';
import { ShakeOnEventDirective } from './shake-on-event.directive';
import { URLEncodeComponent } from './urlencode/urlencode.component';
import { AnimateTextUpdateService } from './animate-text-update.service';
import { JsonComponent } from './json/json.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EpochTimeComponent,
    PageHeaderComponent,
    CurrentTimePanelComponent,
    ConvertTimePanelComponent,
    CopyToClipboardDirective,
    Base64Component,
    ShakeOnEventDirective,
    URLEncodeComponent,
    JsonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule
  ],
  providers: [
    AnimateTextUpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
