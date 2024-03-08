import { Pipe, PipeTransform } from '@angular/core';
import { EUnit } from '@interfaces/EUnit';

const type = {
  [EUnit.CUP]: 'tasse',
  [EUnit.GRAM]: 'g',
  [EUnit.PIECE]: '',
  [EUnit.MILLILITER]: 'ml',
  [EUnit.TABLESPOON]: 'c. a s.',
  [EUnit.TEASPOON]: 'c. a c.',
};

@Pipe({ standalone: true, name: 'unitFormat' })
export class UnitFormat implements PipeTransform {

  constructor() {
  }

  transform(number: number, unit: EUnit): string {
    let unitString = type[unit];

    if (unit == EUnit.GRAM && number >= 200) {
      unitString = 'kg';
      number = number / 1000;
    }

    if (unit == EUnit.MILLILITER && number >= 200) {
      unitString = 'L';
      number = number / 1000;
    }

    return (Math.round(number * 100) / 100) + ' ' + unitString;
  }
}
