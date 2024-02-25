import { User } from './User';
import { RecipeStep } from './RecipeStep';
import { RecipePicture } from './RecipePicture';
import { ESeason } from './ESeason';
import {  StringToESeason, StringToEType } from '@utils/converts';
import { EType } from '@interfaces/EType';
import { API_URL } from '@app/_services/constante';
import { RecipeResponse } from '@interfaces/responseInterface/RecipeResponse';


export class Recipe {
  public id: number;
  public name: string;
  public time: number;
  public portions: number;
  public season: ESeason;
  public type: EType;
  public user: User;
  public steps: RecipeStep[];
  public pictures: RecipePicture[];

  constructor(recipe: RecipeResponse) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.steps = recipe.steps.map(s => new RecipeStep(s));
    this.user = new User(recipe.user);
    this.pictures = recipe.pictures.map(p => new RecipePicture(p));
    this.season = StringToESeason(recipe.season);
    this.type = StringToEType(recipe.type);
    this.time = recipe.time;
    this.portions = recipe.portions;
  }

  public getPictureUrl(): string[] {
    return this.pictures.map(p => `${API_URL}/pictures/${p.imageUrl}`);
  }

}
