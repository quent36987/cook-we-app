import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { PROFILE_ROUTES } from '@app/profile/profile.module';
import { RECIPE_ROUTES } from '@app/recipe/recipe.module';

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
      title: 'Mon espace',
      link: PROFILE_ROUTES.path,
      subServices: [
        {
          icon: 'home',
          title: 'Mon profile',
          link: '',
        },
        {
          icon: 'fastfood',
          title: 'Mes recettes',
          link: PROFILE_ROUTES.recipes,
        },
        {
          icon: 'favorite',
          title: 'Mes favorites',
          link: PROFILE_ROUTES.favorites,
        },
      ],
    },
    {
      title: 'Recettes',
      link: RECIPE_ROUTES.path,
      subServices: [
        {
          icon: 'create',
          title: 'Créer une recette',
          link: RECIPE_ROUTES.create,
        },
        {
          icon: 'search',
          title: 'Trouver une recette',
          link: '',
        },
      ],
    },
    {
      title: 'Mes listes',
      link: '',
      subServices: [
        {
          icon: 'add',
          title: 'Créer une liste',
          link: '',
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
}
