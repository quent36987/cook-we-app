import { RecipeStepResponse } from '@interfaces/responseInterface/RecipeStepResponse';

export class RecipeStep {
  public stepNumber: number;
  public text: string;

  constructor(steps : RecipeStepResponse) {
    this.text = steps.text;
    this.stepNumber = steps.stepNumber;
  }
}
