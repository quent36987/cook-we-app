import { Component, OnInit } from '@angular/core';

import { PopupConfig, PopupType } from './popup.model';
import { PopupService } from '@app/_services/popup.service';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  standalone: true,
  styleUrls: ['./popup.component.css'],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class PopupComponent implements OnInit {
  popupConfig: PopupConfig | null = null;

  popupType = PopupType;

  constructor(private popupService: PopupService) {
  }

  ngOnInit(): void {
    this.popupService.popupState$.subscribe(config => {
      this.popupConfig = config;
    });
  }

  onConfirm(): void {
    if (this.popupConfig?.callback) {
      this.popupConfig.callback(this.popupConfig.inputValue);
    }
    this.popupService.closePopup();
  }

  onCancel(): void {
    this.popupService.closePopup();
  }
}
