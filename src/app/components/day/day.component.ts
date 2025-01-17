import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from '../../calendar/calendar-day.class';
import { StorageService } from '../../services/storage.service';
import { formatDate, month, year, day } from '../../utils/date';
import { IAppointment } from '../../appointment/types';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
})
export class DayComponent implements OnInit {
  @Input() day: CalendarDay | undefined;

  public appointments: IAppointment[] = [];

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.storage.init();
    this.appointments = this.storage.get(
      formatDate(this.day?.date!, 'YYYY-MM-DD')
    );
  }

  public date(): string {
    const date = this.day?.date!;
    return month(date) + ' ' + year(date) + ', ' + day(date);
  }
}
