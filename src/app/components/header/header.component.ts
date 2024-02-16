import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  services: any[] = [
    {
      title: 'Informatique',
      link: 'vente',
      subServices: [
        {
          title: 'Entretiens de vos équipements',
          link: 'entretiens'
        },
        {
          title: "Vente d'équipements",
          link: 'vente'
        },
        {
          title: 'Montage de PC',
          link: 'vente'
        }
      ]
    },
    {
      title: 'Impression 3D',
      link: 'impression3d',
      subServices: [
        {
          title: 'Modélisation Technique',
          link: 'impression3d#modelisation'
        },
        {
          title: 'Impression 3D FDM',
          link: 'impression3d'
        },
        {
          title: 'Vente de consommables',
          link: 'impression3d#consommables'
        },
      ]
    },
    {
      title: 'Déplacement à domicile',
      link: 'domicile',
      subServices: []
    }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }
}
