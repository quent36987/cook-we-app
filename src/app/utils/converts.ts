import { RecipePictureResponse } from '@interfaces/responseInterface/RecipePictureResponse';
import { RecipePicture } from '@interfaces/RecipePicture';
import { UserResponse } from '@interfaces/responseInterface/UserResponse';
import { User } from '@interfaces/User';
import { RecipeStepResponse } from '@interfaces/responseInterface/RecipeStepResponse';
import { RecipeStep } from '@interfaces/RecipeStep';
import { ESeason } from '@interfaces/ESeason';
import { RecipeResponse } from '@interfaces/responseInterface/RecipeResponse';
import { Recipe } from '@interfaces/Recipe';


export function RecipePictureResponseToRecipePicture(pictureResponse: RecipePictureResponse): RecipePicture {
  return {
    imageUrl: pictureResponse.imageUrl,
  };
}

export function RecipePictureResponseToRecipePictureList(pictureResponse: RecipePictureResponse[]): RecipePicture[] {
  return pictureResponse.map(picture => RecipePictureResponseToRecipePicture(picture));
}

export function UserResponseToUser(userResponse: UserResponse): User {
  return {
    username: userResponse.username,
  };
}

export function RecipeStepResponseToRecipeStep(stepResponse: RecipeStepResponse): RecipeStep {
  return {
    stepNumber: stepResponse.stepNumber,
    text: stepResponse.text,
  };
}

export function RecipeStepResponseToRecipeStepList(stepResponse: RecipeStepResponse[]): RecipeStep[] {
  return stepResponse.map(step => RecipeStepResponseToRecipeStep(step));
}

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

export function RecipeResponseToRecipe(recipeResponse: RecipeResponse): Recipe {
  return {
    id: recipeResponse.id,
    name: recipeResponse.name,
    ingredients: [],
    steps: RecipeStepResponseToRecipeStepList(recipeResponse.steps),
    pictures: RecipePictureResponseToRecipePictureList(recipeResponse.pictures),
    time: recipeResponse.time,
    portions: recipeResponse.portions,
    season: StringToESeason(recipeResponse.season),
    user: UserResponseToUser(recipeResponse.user),
    comments: [],
  };
}

export function RecipeResponseToRecipeList(recipeResponse: RecipeResponse[]): Recipe[] {
  return recipeResponse.map(recipe => RecipeResponseToRecipe(recipe));
}
