import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { EpochTimeComponent } from './epoch-time/epoch-time.component';

export const AppRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'epoch-time',
    component: EpochTimeComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
