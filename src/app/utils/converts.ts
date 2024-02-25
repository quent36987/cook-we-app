import { RecipePictureResponse } from '@interfaces/responseInterface/RecipePictureResponse';
import { RecipePicture } from '@interfaces/RecipePicture';
import { UserResponse } from '@interfaces/responseInterface/UserResponse';
import { User } from '@interfaces/User';
import { RecipeStepResponse } from '@interfaces/responseInterface/RecipeStepResponse';
import { RecipeStep } from '@interfaces/RecipeStep';
import { ESeason } from '@interfaces/ESeason';
import { RecipeResponse } from '@interfaces/responseInterface/RecipeResponse';
import { Recipe } from '@interfaces/Recipe';
import { EUnit } from '@interfaces/EUnit';
import { EType } from '@interfaces/EType';

//
// export function RecipePictureResponseToRecipePicture(pictureResponse: RecipePictureResponse): RecipePicture {
//   return {
//     imageUrl: pictureResponse.imageUrl,
//   };
// }
//
// export function RecipePictureResponseToRecipePictureList(pictureResponse: RecipePictureResponse[]): RecipePicture[] {
//   return pictureResponse.map(picture => RecipePictureResponseToRecipePicture(picture));
// }
//
// export function UserResponseToUser(userResponse: UserResponse): User {
//   return {
//     username: userResponse.username,
//   };
// }
//
// export function RecipeStepResponseToRecipeStep(stepResponse: RecipeStepResponse): RecipeStep {
//   return {
//     stepNumber: stepResponse.stepNumber,
//     text: stepResponse.text,
//   };
// }
//
// export function RecipeStepResponseToRecipeStepList(stepResponse: RecipeStepResponse[]): RecipeStep[] {
//   return stepResponse.map(step => RecipeStepResponseToRecipeStep(step));
// }

export function StringToESeason(season: string): ESeason {
  switch (season) {
    case 'WINTER':
      return ESeason.WINTER;
    case 'SPRING':
      return ESeason.SPRING;
    case 'SUMMER':
      return ESeason.SUMMER;
    case 'AUTUMN':
      return ESeason.AUTUMN;
    default:
      return ESeason.UNKNOWN;
  }
}

export function ESeasonToString(season: ESeason): string {
  switch (season) {
    case ESeason.WINTER:
      return 'WINTER';
    case ESeason.SPRING:
      return 'SPRING';
    case ESeason.SUMMER:
      return 'SUMMER';
    case ESeason.AUTUMN:
      return 'AUTUMN';
    default:
      return '';
  }
}

export function EUnitToString(unit: EUnit): string {
  switch (unit) {
    case EUnit.GRAM:
      return 'GRAM';
    case EUnit.CUP:
      return 'CUP';
    case EUnit.MILLILITER:
      return 'MILLILITER';
    case EUnit.PIECE:
      return 'PIECE';
    case EUnit.TABLESPOON:
      return 'TABLESPOON';
    case EUnit.TEASPOON:
      return 'TEASPOON';
    default:
      return '';
  }
}

export function ETypeToString(type: EType): string {
  switch (type) {
    case EType.ENTREE:
      return 'ENTREE';
    case EType.PLAT:
      return 'PLAT';
    case EType.DESSERT:
      return 'DESSERT';
    default:
      return '';
  }
}

export function StringToEType(type: string): EType {
  switch (type) {
    case 'ENTREE':
      return EType.ENTREE;
    case 'PLAT':
      return EType.PLAT;
    case 'DESSERT':
      return EType.DESSERT;
    default:
      return EType.ENTREE;
  }
}

export function StringToEUnit(unit: string): EUnit {
  switch (unit) {
    case 'GRAM':
      return EUnit.GRAM;
    case 'CUP':
      return EUnit.CUP;
    case 'MILLILITER':
      return EUnit.MILLILITER;
    case 'PIECE':
      return EUnit.PIECE;
    case 'TABLESPOON':
      return EUnit.TABLESPOON;
    case 'TEASPOON':
      return EUnit.TEASPOON;
    default:
      return EUnit.PIECE;
  }
}

// export function RecipeResponseToRecipe(recipeResponse: RecipeResponse): Recipe {
//   return {
//     id: recipeResponse.id,
//     name: recipeResponse.name,
//     ingredients: [],
//     steps: RecipeStepResponseToRecipeStepList(recipeResponse.steps),
//     pictures: RecipePictureResponseToRecipePictureList(recipeResponse.pictures),
//     time: recipeResponse.time,
//     portions: recipeResponse.portions,
//     season: StringToESeason(recipeResponse.season),
//     user: UserResponseToUser(recipeResponse.user),
//     comments: [],
//   };
// }

// export function RecipeResponseToRecipeList(recipeResponse: RecipeResponse[]): Recipe[] {
//   return recipeResponse.map(recipe => RecipeResponseToRecipe(recipe));
// }
