import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'timeFormat' })
export class TimeFormat implements PipeTransform {

  private readonly MINUTE: string;
  private readonly HOUR: string;
  private readonly DAY: string;

  constructor() {

    this.MINUTE = 'm';
    this.HOUR = 'h';
    this.DAY = 'j';
  }

  transform(val: number | string): string {
    let value = Number(val);
    let suffix = this.MINUTE;

    if (value >= 60 && value < 24 * 60) {
      value = (value / 60);
      suffix = this.HOUR;
    }

    if (value >= 24 * 60) {
      value = (value / 24 * 60);
      suffix = this.DAY;
    }

    return Math.round(value * 100) / 100 + suffix;
  }
}
