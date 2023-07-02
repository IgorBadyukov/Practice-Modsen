import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "roundPipe",
})
export class RoundPipePipe implements PipeTransform {
  transform(value: number | string, precision: number): string {
    if (typeof value === "number") {
      return value.toFixed(precision);
    } else if (typeof value === "string") {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue.toFixed(precision);
      }
    }
    return value.toString();
  }
}
