import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() username!: string;

  @Output() deleteUser: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  onDelete() {
    this.deleteUser.emit();
  }


}
