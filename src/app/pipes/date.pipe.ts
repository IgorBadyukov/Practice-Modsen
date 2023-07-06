import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: string): string {
    const dateTime = new Date(value);
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    } as Intl.DateTimeFormatOptions;
    return dateTime.toLocaleDateString('en-US', options);
  }
}
