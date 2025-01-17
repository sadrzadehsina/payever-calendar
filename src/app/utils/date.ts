import * as dayjs from 'dayjs';

export function formatDate(date: Date, format: string): string {
  return dayjs(date).format(format);
}

export function year(date: Date): string {
  return formatDate(date, 'YYYY');
}

export function month(date: Date): string {
  return formatDate(date, 'MMMM');
}

export function day(date: Date): string {
  return formatDate(date, 'DD');
}
