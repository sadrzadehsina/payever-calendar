import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CalendarDay } from './calendar-day.class';
import { ChunkPipe } from '../pipes/chunk-pipe';
import { AppHeaderComponent } from '../components/app-header/app-header.component';
import { DayComponent } from '../components/day/day.component';
import * as dayjs from 'dayjs';
import { month, year } from '../utils/date';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  imports: [ChunkPipe, RouterLink, DayComponent, MatButtonModule, AppHeaderComponent],
})
export class CalendarComponent implements OnInit {
  private currentMonth: Date = new Date();

  public calendarDays: CalendarDay[] = [];

  ngOnInit(): void {
    this.generateCalendarDays(this.currentMonth);
  }

  private generateCalendarDays(date: Date): void {
    const numberOfDaysToShow = 42;

    this.calendarDays = [];

    let dateToAdd = this.getStartDateOfCalendar(date);

    this.calendarDays.push(new CalendarDay(new Date(dateToAdd)));

    for (let i = 0; i < numberOfDaysToShow; i++) {
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
      this.calendarDays.push(new CalendarDay(new Date(dateToAdd)));
    }
  }

  private getStartDateOfCalendar(date: Date) {
    const clonedDate = new Date(date);

    const lastDayOfPreviousMonth = new Date(clonedDate.setDate(0));

    let startDateOfCalendar: Date = lastDayOfPreviousMonth;

    if (startDateOfCalendar.getDay() != 1) {
      do {
        startDateOfCalendar = new Date(
          startDateOfCalendar.setDate(startDateOfCalendar.getDate() - 1)
        );
      } while (startDateOfCalendar.getDay() != 1);
    }

    return startDateOfCalendar;
  }

  public previousMonth(): void {
    const previousMonth = dayjs(this.currentMonth)
      .subtract(1, 'month')
      .toDate();
    this.generateCalendarDays(previousMonth);

    this.currentMonth = previousMonth;
  }

  public today(): void {
    this.generateCalendarDays(new Date());
  }

  public nextMonth(): void {
    const nextMonth = dayjs(this.currentMonth).add(1, 'month').toDate();
    this.generateCalendarDays(nextMonth);

    this.currentMonth = nextMonth;
  }

  public get stringCurrentMonth(): string {
    return month(this.currentMonth) + ' ' + year(this.currentMonth);
  }
}
