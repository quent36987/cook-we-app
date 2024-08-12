import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrl: './picture-form.component.css'
})
export class PictureFormComponent {

  @Input() pictureUrl!: string;

  @Output()  delete : EventEmitter<string> = new EventEmitter();

  public onClick(): void {
    this.delete.emit(this.pictureUrl);
  }
}
