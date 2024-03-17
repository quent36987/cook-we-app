import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ standalone: true, name: 'titleFormat' })
export class TitleFormat implements PipeTransform {

  constructor() {
  }

  transform(val: string, max : number = 45): string {
    if (val.length > max) {
      return val.substring(0, max) + '...';
    }

    return val;
  }
}
