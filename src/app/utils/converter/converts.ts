import { ESeason } from '@interfaces/ESeason';
import { EUnit } from '@interfaces/EUnit';
import { EType } from '@interfaces/EType';


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
      return ESeason.ALL;
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
    case EUnit.POT:
      return 'POT';
    case EUnit.PINCH:
      return 'PINCH';
    case EUnit.SACHET:
      return 'SACHET';
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
    case 'POT':
      return EUnit.POT;
    case 'PINCH':
      return EUnit.PINCH;
    case 'SACHET':
      return EUnit.SACHET;
    default:
      return EUnit.PIECE;
  }
}
