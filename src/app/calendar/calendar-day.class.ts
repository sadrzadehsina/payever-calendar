export class CalendarDay {
  public date: Date;
  public isPastDate: boolean;
  public isToday: boolean;

  constructor(date: Date) {
    this.date = date;
    this.isPastDate =
      date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }
}
