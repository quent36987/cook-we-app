import { Pipe, PipeTransform } from '@angular/core';
import { EType } from '@interfaces/EType';

const type = {
  [EType.DESSERT]: 'dessert',
  [EType.PLAT]: 'plat',
  [EType.ENTREE]: 'entrée',
};

@Pipe({ standalone: true, name: 'typeFormat' })
export class TypeFormat implements PipeTransform {

  constructor() {
  }

  transform(val: EType): string {
    return type[val];
  }
}
