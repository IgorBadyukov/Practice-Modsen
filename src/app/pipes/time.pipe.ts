import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string, hour12: boolean): string {
    const dateTime = new Date(value);
    return  dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12 })
  }
}
