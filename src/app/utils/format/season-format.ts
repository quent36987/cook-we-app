import { Pipe, PipeTransform } from '@angular/core';
import { ESeason } from '@interfaces/ESeason';

const type = {
  [ESeason.SPRING]: 'Printemps',
  [ESeason.SUMMER]: 'Eté',
  [ESeason.WINTER]: 'Hiver',
  [ESeason.AUTUMN]: 'Automne',
  [ESeason.ALL]: 'Toutes',
};

@Pipe({ standalone: true, name: 'seasonFormat' })
export class SeasonFormat implements PipeTransform {

  constructor() {
  }

  transform(val: ESeason): string {
    return type[val];
  }
}
