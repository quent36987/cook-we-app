import { Pipe, PipeTransform } from '@angular/core';
import { EUnit } from '@interfaces/EUnit';

const type = {
  [EUnit.CUP]: 'tasse',
  [EUnit.GRAM]: 'g',
  [EUnit.PIECE]: '',
  [EUnit.MILLILITER]: 'ml',
  [EUnit.TABLESPOON]: 'c. a s.',
  [EUnit.TEASPOON]: 'c. a c.',
  [EUnit.POT]: 'pot',
  [EUnit.PINCH]: "pincée",
  [EUnit.SACHET]: 'sachet',
};

const intergerType =  [
  EUnit.PINCH,
  EUnit.PIECE,
  EUnit.TABLESPOON,
  EUnit.TEASPOON,
]

@Pipe({ standalone: true, name: 'unitFormat' })
export class UnitFormat implements PipeTransform {

  constructor() {
  }

  transform(number: number, unit: EUnit): string {
    let unitString = type[unit];

    if (unit == EUnit.GRAM && number >= 1000) {
      unitString = 'kg';
      number = number / 1000;
    }

    if (unit == EUnit.MILLILITER && number >= 1000) {
      unitString = 'L';
      number = number / 1000;
    }

    if (intergerType.includes(unit)) {
      number = Math.round(number);
      number === 0 ? number = 1 : number;
    }

    return (Math.round(number * 100) / 100) + ' ' + unitString;
  }
}
