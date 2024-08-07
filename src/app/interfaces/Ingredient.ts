import { IngredientResponse } from '@interfaces/responseInterface/IngredientResponse';
import { CreateIngredientRequest } from '@interfaces/requestInterface/CreateIngredientRequest';
import { StringToEUnit } from '@utils/converter/converts';
import { EUnit } from '@interfaces/EUnit';

export class Ingredient {
  public name: string;
  public quantity: number;
  public unit: EUnit;

  constructor(ingredient: IngredientResponse) {
    this.name = ingredient.name;
    this.unit = StringToEUnit(ingredient.unit);
    this.quantity = ingredient.quantity;
  }

  public toString(): string {
    return this.quantity + ' ' + this.unit + ' ' + this.name;
  }

  public get roundQuantity(): string {
    if (this.quantity % 1 === 0) {
      return this.quantity.toFixed(0);
    }

    return this.quantity.toFixed(2);
  }

  public toIngredientRequest(): CreateIngredientRequest {
    return {
      name: this.name,
      unit: this.unit,
      quantity: this.quantity,
    };
  }
}
