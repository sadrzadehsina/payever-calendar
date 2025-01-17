import { Pipe, PipeTransform } from '@angular/core';
import { CalendarDay } from '../calendar/calendar-day.class';

@Pipe({
  name: 'chunk',
})
export class ChunkPipe implements PipeTransform {
  transform(calendarDaysArray: CalendarDay[], chunkSize: number): any {

    const calendarDays: CalendarDay[][] = [];
    let weekDays: CalendarDay[] = [];

    calendarDaysArray.map((day, index) => {
      weekDays.push(day);
      if (++index % chunkSize === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });

    return calendarDays;
  }
}
