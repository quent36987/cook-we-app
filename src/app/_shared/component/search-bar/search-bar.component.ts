import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
  ],
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {

}
