import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dayName",
})
export class DayNamePipe implements PipeTransform {
  transform(date: string): string {
    const dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const parts = date.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dayOfWeekIndex = new Date(year, month, day).getDay();
    return dayOfWeekNames[dayOfWeekIndex];
  }
}
