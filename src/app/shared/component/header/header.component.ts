import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  services: any[] = [
    {
      title: 'Mon espace',
      link: 'profile',
      subServices: [
        {
          icon: 'home',
          title: 'Mon profile',
          link: 'profile',
        },
        {
          icon: 'fastfood',
          title: 'Mes recettes',
          link: 'my-recipes',
        },
        {
          icon: 'favorite',
          title: 'Mes favorites',
          link: 'favorites',
        },
      ],
    },
    {
      title: 'Recettes',
      link: 'recipes',
      subServices: [
        {
          icon: 'create',
          title: 'Créer une recette',
          link: 'create-recipe',
        },
        {
          icon: 'search',
          title: 'Trouver une recette',
          link: 'search-recipe',
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
