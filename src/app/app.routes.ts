import { Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'create-appointment',
        component: AppointmentComponent,
      },
    ],
  },
];
