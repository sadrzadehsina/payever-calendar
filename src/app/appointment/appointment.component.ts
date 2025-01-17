import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AppHeaderComponent } from '../components/app-header/app-header.component';
import { StorageService } from '../services/storage.service';
import { uuid } from '../utils/uuid';
import { formatDate } from '../utils/date';
import { IAppointment } from './types';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatTimepickerModule,
    AppHeaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentComponent {
  private appointments: IAppointment[] = [];

  private router: Router = new Router();

  appointmentForm = new FormGroup({
    title: new FormControl('', Validators.required),
    invitees: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(private storage: StorageService) {
    this.storage.init();
  }

  private navigateToCalendar() {
    return this.router.navigate(['/calendar']);
  }

  private get appointmentDate() {
    return formatDate(
      this.appointmentForm.value.date as unknown as Date,
      'YYYY-MM-DD'
    );
  }

  private get appointmentTime() {
    return formatDate(
      this.appointmentForm.value.time as unknown as Date,
      'HH:mm'
    );
  }

  addAppointment(): void {
    this.appointments = this.storage.get(this.appointmentDate);
    if (!this.appointments) {
      this.appointments = [];
    }
    this.appointments.push({
      title: this.appointmentForm.value.title!,
      invitees: this.appointmentForm.value.invitees!,
      location: this.appointmentForm.value.location!,
      description: this.appointmentForm.value.description!,
      date: this.appointmentDate,
      time: this.appointmentTime,
      id: uuid(),
    });
    this.storage.set(this.appointmentDate, this.appointments);

    this.navigateToCalendar();
  }
}
