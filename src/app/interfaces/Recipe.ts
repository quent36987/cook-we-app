import { User } from './User';
import { RecipeStep } from './RecipeStep';
import { RecipePicture } from './RecipePicture';
import { ESeason } from './ESeason';
import {  StringToESeason, StringToEType } from '@utils/converter/converts';
import { EType } from '@interfaces/EType';
import { RecipeResponse } from '@interfaces/responseInterface/RecipeResponse';
import { API_URL } from '@app/environments/environment';


export class Recipe {
  public id: number;
  public name: string;
  public time: number;
  public portions: number;
  public season: ESeason;
  public type: EType;
  public pictures: RecipePicture[];

  constructor(recipe: RecipeResponse) {
    this.id = recipe.id;
    this.name = recipe.name;
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
