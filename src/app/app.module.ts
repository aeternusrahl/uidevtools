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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EpochTimeComponent,
    PageHeaderComponent,
    CurrentTimePanelComponent,
    CopyToClipboardDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
