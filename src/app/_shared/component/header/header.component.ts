import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PROFILE_ROUTES } from '@app/profile/profile.module';
import { RECIPE_ROUTES } from '@app/recipe/recipe.module';
import { SHOPPING_LIST_ROUTES } from '@app/shopping-list/shopping-list.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
  imports: [
    MatIcon,
    RouterLink,
    CommonModule,
  ],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  services: any[] = [
    {
      title: 'Accueil',
      link: '',
      subServices: [
        {
          icon: 'home',
          title: 'Accueil',
          link: '',
        },
      ],
    },
    {
      title: 'Mon espace',
      link: PROFILE_ROUTES.path,
      subServices: [
        {
          icon: 'account_circle',
          title: 'Mon profile',
          link: PROFILE_ROUTES.path,
        },
        {
          icon: 'fastfood',
          title: 'Mes recettes',
          link: `${PROFILE_ROUTES.path}/${PROFILE_ROUTES.recipes}`,
        },
        {
          icon: 'favorite',
          title: 'Mes favorites',
          link: `${PROFILE_ROUTES.path}/${PROFILE_ROUTES.favorites}`,
        },
      ],
    },
    {
      title: 'Recettes',
      link: '',
      subServices: [
        {
          icon: 'create',
          title: 'Créer une recette',
          link: `${RECIPE_ROUTES.path}/${RECIPE_ROUTES.create}`,
        },
        {
          icon: 'search',
          title: 'Trouver une recette',
          link: `${RECIPE_ROUTES.path}/${RECIPE_ROUTES.search}`,
        },
      ],
    },
    {
      title: 'Mes listes',
      link: '',
      subServices: [
        {
          icon: 'shopping_cart',
          title: 'Mes listes',
          link: `${SHOPPING_LIST_ROUTES.path}`,
        },
      ],
    },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.classList.remove('menu-open');
  }

  protected readonly PROFILE_ROUTES = PROFILE_ROUTES;
}
