import { Pipe, PipeTransform } from '@angular/core';
import { EType } from '@interfaces/EType';

const type = {
  [EType.DESSERT]: 'Dessert',
  [EType.PLAT]: 'Plat',
  [EType.ENTREE]: 'Entrée',
};

@Pipe({ standalone: true, name: 'typeFormat' })
export class TypeFormat implements PipeTransform {

  constructor() {
  }

  transform(val: EType): string {
    return type[val];
  }
}
