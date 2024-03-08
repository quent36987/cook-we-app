import { Pipe, PipeTransform } from '@angular/core';
import { ESeason } from '@interfaces/ESeason';

const type = {
  [ESeason.SPRING]: 'printemps',
  [ESeason.SUMMER]: 'été',
  [ESeason.WINTER]: 'hiver',
  [ESeason.AUTUMN]: 'automne',
  [ESeason.ALL]: 'toutes',
};

@Pipe({ standalone: true, name: 'seasonFormat' })
export class SeasonFormat implements PipeTransform {

  constructor() {
  }

  transform(val: ESeason): string {
    return type[val];
  }
}
